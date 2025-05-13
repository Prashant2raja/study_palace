import { useState } from 'react';
import axios from 'axios';
import './Login.css'; // reuse

export default function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/forgot-password', { email });
      alert('Check your inbox for the reset link.');
    } catch (e) {
      alert(e.response?.data?.error || 'Error sending link');
    }
  };

  return (
    <div className="login-container">
      <h2>Password Reset</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          className="login-input"
          placeholder="you@example.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="login-button">Send Reset Link</button>
      </form>
    </div>
  );
}
