// src/pages/ResetPassword.jsx
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

export default function ResetPassword() {
  const { token } = useParams();
  const navigate  = useNavigate();
  const [pw, setPw]   = useState('');
  const [cpw, setCpw] = useState('');

  const handle = async e => {
    e.preventDefault();
    if (pw !== cpw) return alert('Passwords must match');
    await axios.post(`https://studypalacebackend-production.up.railway.app/reset-password/${token}`, { password: pw });
    alert('Password reset! Please log in.');
    navigate('/login');
  };

  return (
    <div className="login-container">
      <h2>Set New Password</h2>
      <form className="login-form" onSubmit={handle}>
        <input
          type="password"
          className="login-input"
          placeholder="New password"
          value={pw}
          onChange={e => setPw(e.target.value)}
          required
        />
        <input
          type="password"
          className="login-input"
          placeholder="Confirm password"
          value={cpw}
          onChange={e => setCpw(e.target.value)}
          required
        />
        <button type="submit" className="login-button">Reset Password</button>
      </form>
    </div>
  );
}
