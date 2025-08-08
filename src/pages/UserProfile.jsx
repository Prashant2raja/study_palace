// src/pages/EditUser.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EditUser.css';

export default function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    father_name: '',
    mob_number: '',
    email: '',
    address: '',
    gov_id: '',
    seat_number: '',
    time_slot: '',
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios
      .get(`https://studypalacebackend-production.up.railway.app/api/user/${formData.email}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const user = res.data;
        setFormData({
          name: user.name || '',
          father_name: user.father_name || '',
          mob_number: user.mob_number || '',
          email: user.email || '',
          address: user.address || '',
          gov_id: user.gov_id || '',
          seat_number: user.seat_number || '',
          time_slot: user.time_slot || '',
        });
      })
      .catch(() => setError('Failed to fetch user data.'));
  }, [id]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await axios.put(
        `https://studypalacebackend-production.up.railway.app/api/admin/user/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('User updated successfully!');
      navigate('/admin/user-profile'); // Change to your actual route
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert('Update failed!');
    }
  };

  return (
    <div className="edit-user-container">
      <h2>Edit User Details</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} className="edit-user-form">
        {Object.entries(formData).map(([key, value]) => (
          <div className="form-group" key={key}>
            <label>{key.replace('_', ' ').toUpperCase()}</label>
            <input
              type="text"
              name={key}
              value={value}
              onChange={handleChange}
            />
          </div>
        ))}
        <button type="submit" className="btn submit-btn">Update</button>
      </form>
    </div>
  );
}
