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
  const [filterSlot, setFilterSlot] = useState(() => localStorage.getItem("filterSlot") || timeSlots[0]);
  const [seats, setSeats] = useState({});
  const [selectedSeat, setSelectedSeat] = useState(null);

  const authHeader = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    localStorage.setItem("filterSlot", filterSlot);
    const slotRequest = axios.get(`https://studypalacebackend-production.up.railway.app/api/seats?timeSlot=${filterSlot}`, { headers: authHeader });
    const allDayRequest = axios.get(`https://studypalacebackend-production.up.railway.app/api/seats?timeSlot=7am-10pm`, { headers: authHeader });

    Promise.all([slotRequest, allDayRequest])
      .then(([slotRes, allDayRes]) => {
        const map = {};
        seatRanges.forEach((range) => {
          for (let i = range.start; i <= range.end; i++) {
            map[i] = { status: "available", timeSlot: null };
          }
        });
        allDayRes.data.forEach(({ seat_number }) => {
          map[seat_number] = { status: "all-shifts", timeSlot: "7am-10pm" };
        });
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
      .post("https://studypalacebackend-production.up.railway.app/api/bookings", { seat_number: selectedSeat, time_slot: slot }, { headers: authHeader })
      .then(() => {
        const amount = slot === "7am-10pm" ? 2 : 1;
        navigate(`/payments?seat=${selectedSeat}&slot=${slot}&amount=${amount}`);
      })
      .catch((err) => {
        const msg = err.response?.data?.error || "Booking failed";
        alert(msg);
      });
  };

  const closePopup = () => setSelectedSeat(null);

  return (
    <div className="seat-booking-page">
      <div className="seat-booking-container">
        <h1 className="page-title">Book Your Seat</h1>
        <p className="page-subtitle">Select a time slot to view available seats</p>

        <div className="filter-bar">
          {timeSlots.map((slot) => (
            <button key={slot} className={`filter-btn ${slot === filterSlot ? "active" : ""}`} onClick={() => handleFilterClick(slot)}>
              {slot}
            </button>
          ))}
        </div>

        <div className="seating-grid-area">
          {seatRanges.map((range, rowIndex) => (
            <div className="seat-row" key={rowIndex}>
              {Array.from({ length: range.end - range.start + 1 }, (_, i) => {
                const seatNumber = range.start + i;
                const seat = seats[seatNumber] || { status: "available" };
                return (
                  <div key={seatNumber} className={`seat-box ${seat.status} ${seat.status !== "available" ? "disabled" : ""}`} onClick={() => handleSeatClick(seatNumber)}>
                    {seatNumber}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div className="legend">
          <div className="legend-item">
            <div className="legend-box available"></div>
            <span>Available</span>
          </div>
          <div className="legend-item">
            <div className="legend-box limited"></div>
            <span>Booked (This Slot)</span>
          </div>
          <div className="legend-item">
            <div className="legend-box all-shifts"></div>
            <span>Booked (All Day)</span>
          </div>
        </div>
      </div>

      {selectedSeat && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Select Time Slot for Seat <strong>{selectedSeat}</strong></h3>
            <div className="popup-actions">
                {timeSlots.map((slot) => (
                    <button key={slot} className="btn-popup" onClick={() => handleTimeSelect(slot)}>
                        Book for {slot}
                    </button>
                ))}
            </div>
            <button className="btn-popup btn-cancel" onClick={closePopup}>
              Cancel
            </button>
          </div>
        </div>
      )}
      
      {/* --- Website Footer --- */}
      <footer className="site-footer">
        <p>&copy; 2025 BUDHA LIBRARY. All Rights Reserved.</p>
        <div className="footer-links">
          <a href="#privacy">Privacy Policy</a>
          <span>|</span>
          <a href="#terms">Terms of Service</a>
        </div>
      </footer>
    </div>
  );
}
