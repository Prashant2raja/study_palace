// src/pages/AdminBooking.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminBooking() {
  const [bookings, setBookings] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
  axios
    .get("https://studypalacebackend-production.up.railway.app/admin/book", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => setBookings(res.data))
    .catch((err) => {
      console.error("Error fetching admin bookings:", err);
      alert("Failed to fetch bookings");
    });
}, []);


  return (
    <div style={{ padding: "20px" }}>
      <h2>All Bookings (Admin)</h2>
      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>User ID</th>
            <th>Seat Number</th>
            <th>Time Slot</th>
            <th>Booking Time</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b.id}>
              <td>{b.id}</td>
              <td>{b.user_id}</td>
              <td>{b.seat_number}</td>
              <td>{b.time_slot}</td>
              <td>{new Date(b.booking_time).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
