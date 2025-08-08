// src/pages/UserProfile.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';

export default function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    father_name: '',
    mob_number: '',
    email: '',
    address: '',
    gov_id: '',
    seat_number: '',
    time_slot: ''
  });

  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get(`https://studypalacebackend-production.up.railway.app/api/signup`)
      .then(res => {
        const user = res.data.find(u => u.id === parseInt(id));
        if (user) setForm(user);
      });
  }, [id]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.put(
        `https://studypalacebackend-production.up.railway.app/admin/user/${id}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      alert('User updated successfully');
      navigate('/admin/user-profile');
    } catch (err) {
      console.error(err);
      alert('Update failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="edit-user-form">
      {Object.keys(form).map(key => (
        <div key={key}>
          <label>{key}</label>
          <input
            name={key}
            value={form[key] || ''}
            onChange={handleChange}
          />
        </div>
      ))}
      <button type="submit">Update</button>
    </form>
  );
}

