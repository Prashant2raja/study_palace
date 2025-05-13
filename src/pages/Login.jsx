import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:8080/login', {
        email,
        password,
        role,
      });

      const { token, email: userEmail, role: userRole } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('userEmail', userEmail);
      localStorage.setItem('role', userRole);

      if (userRole === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-heading">{role === 'admin' ? 'Admin Login' : 'User Login'}</h2>

      <div className="login-role-toggle">
        <label>
          <input
            type="radio"
            name="role"
            value="user"
            checked={role === 'user'}
            onChange={() => setRole('user')}
          />{' '}
          User
        </label>
        <label>
          <input
            type="radio"
            name="role"
            value="admin"
            checked={role === 'admin'}
            onChange={() => setRole('admin')}
          />{' '}
          Admin
        </label>
      </div>

      <form className="login-form" onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            className="login-input"
            placeholder="you@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            className="login-input"
            placeholder="••••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="login-footer">
          <Link to="/forgot-password" className="login-forgot">
            Forgot Password?
          </Link>
          <button type="submit" className="login-button">
            {role === 'admin' ? 'Admin Login' : 'Login'}
          </button>
        </div>
      </form>

      {role === 'user' && (
        <p className="login-signup">
          Don’t have an account? <Link to="/signup">Sign Up</Link>
        </p>
      )}
    </div>
  );
}
