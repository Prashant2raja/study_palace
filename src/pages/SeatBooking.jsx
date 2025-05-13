// SeatBooking.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SeatBooking.css";

const seatRanges = [
  { start: 1, end: 30 },
  { start: 31, end: 50 },
  { start: 51, end: 78 },
  { start: 79, end: 112 },
  { start: 114, end: 130 },
];

const timeSlots = ["7am-12pm", "12pm-5pm", "5pm-10pm", "7am-10pm"];

export default function SeatBooking() {
  const navigate = useNavigate();

  const [filterSlot, setFilterSlot] = useState(() => {
    return localStorage.getItem("filterSlot") || timeSlots[0];
  });
  const [seats, setSeats] = useState({});
  const [selectedSeat, setSelectedSeat] = useState(null);

  const authHeader = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    localStorage.setItem("filterSlot", filterSlot);

    const slotRequest = axios.get(
      `http://localhost:8080/api/seats?timeSlot=${filterSlot}`,
      { headers: authHeader }
    );

    const allDayRequest = axios.get(
      `http://localhost:8080/api/seats?timeSlot=7am-10pm`,
      { headers: authHeader }
    );

    Promise.all([slotRequest, allDayRequest])
      .then(([slotRes, allDayRes]) => {
        const map = {};

        // Step 1: initialize all seats as available
        seatRanges.forEach((range) => {
          for (let i = range.start; i <= range.end; i++) {
            map[i] = { status: "available", timeSlot: null };
          }
        });

        // Step 2: apply all-day bookings first (they should always be red)
        allDayRes.data.forEach(({ seat_number }) => {
          map[seat_number] = { status: "all-shifts", timeSlot: "7am-10pm" };
        });

        // Step 3: apply time-slot specific bookings if not already booked for all shifts
        slotRes.data.forEach(({ seat_number, status }) => {
          if (map[seat_number].status !== "all-shifts") {
            map[seat_number] = { status, timeSlot: filterSlot };
          }
        });

        setSeats(map);
      })
      .catch((err) => console.error("Error fetching seat data:", err));
  }, [filterSlot]);

  const handleFilterClick = (slot) => {
    setFilterSlot(slot);
    setSelectedSeat(null);
  };

  const handleSeatClick = (seatNumber) => {
    if (seats[seatNumber]?.status !== "available") return;
    setSelectedSeat(seatNumber);
  };

  const handleTimeSelect = (slot) => {
    axios
      .post(
        "http://localhost:8080/api/bookings",
        { seat_number: selectedSeat, time_slot: slot },
        { headers: authHeader }
      )
      .then(() => {
        const amount = slot === "7am-10pm" ? 2 : 1;
        navigate(
          `/payments?seat=${selectedSeat}&slot=${slot}&amount=${amount}`
        );
      })
      .catch((err) => {
        const msg = err.response?.data?.error || "Booking failed";
        alert(msg);
      });
  };

  const closePopup = () => setSelectedSeat(null);

  return (
    <div className="seat-container">
      {/* Time-slot filter bar */}
      <div className="filter-bar">
        {timeSlots.map((slot) => (
          <button
            key={slot}
            className={slot === filterSlot ? "active" : ""}
            onClick={() => handleFilterClick(slot)}
          >
            {slot}
          </button>
        ))}
      </div>

      {/* Seat grid */}
      {seatRanges.map((range, rowIndex) => (
        <div className="seat-row" key={rowIndex}>
          {Array.from({ length: range.end - range.start + 1 }, (_, i) => {
            const seatNumber = range.start + i;
            const seat = seats[seatNumber] || { status: "available" };

            return (
              <div
                key={seatNumber}
                className={`seat-box ${seat.status} ${
                  seat.status !== "available" ? "disabled" : ""
                }`}
                onClick={() => handleSeatClick(seatNumber)}
              >
                {seatNumber}
              </div>
            );
          })}
        </div>
      ))}

      {/* Popup for time selection */}
      {selectedSeat && (
        <div className="popup">
          <div className="popup-content">
            <h3>Select time slot for Seat {selectedSeat}</h3>
            {timeSlots.map((slot) => (
              <button key={slot} onClick={() => handleTimeSelect(slot)}>
                {slot}
              </button>
            ))}
            <button onClick={closePopup} style={{ marginTop: "10px" }}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="legend">
        <h4>Seat Color Legend:</h4>
        <div className="legend-item">
          <div className="legend-box available"></div>
          <span>Green: Available</span>
        </div>
        <div className="legend-item">
          <div className="legend-box limited"></div>
          <span>Blue: Booked for another shift</span>
        </div>
        <div className="legend-item">
          <div className="legend-box all-shifts"></div>
          <span>Red: Booked 7am–10pm (blocked everywhere)</span>
        </div>
      </div>
    </div>
  );
}
