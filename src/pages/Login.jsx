import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

// --- SVG Icons for a modern look ---
const EmailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>;
const PasswordIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>;

export default function Login() {
    const navigate = useNavigate();
    const [role, setRole] = useState('user');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('https://studypalacebackend-production.up.railway.app/api/login', {
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
            alert(err.response?.data?.error || 'Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="login-page">
            <div className="login-grid">
                
                {/* --- Branding Panel (Left Side) --- */}
                <div className="branding-panel">
                    <div className="branding-content">
                        <h1>BUDHA LIBRARY</h1>
                        <p>Your Gateway to Serenity and Knowledge.</p>
                    </div>
                </div>

                {/* --- Login Form Panel (Right Side) --- */}
                <div className="login-panel">
                    <h2 className="login-heading">Welcome Back</h2>
                    <p className="login-subheading">Please sign in to continue</p>

                    {/* --- Custom Role Toggle Switch --- */}
                    <div className="role-toggle">
                        <input type="radio" id="user-role" name="role" value="user" checked={role === 'user'} onChange={() => setRole('user')} />
                        <label htmlFor="user-role">User</label>
                        <input type="radio" id="admin-role" name="role" value="admin" checked={role === 'admin'} onChange={() => setRole('admin')} />
                        <label htmlFor="admin-role">Admin</label>
                        <div className="role-toggle-glider"></div>
                    </div>
                    
                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="input-group">
                            <EmailIcon />
                            <input
                                type="email"
                                placeholder="Email Address"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <PasswordIcon />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        
                        <div className="login-actions">
                            <Link to="/forgot-password" className="login-forgot-link">Forgot Password?</Link>
                        </div>

                        <button type="submit" className="btn-login">
                            Login
                        </button>
                    </form>

                    {role === 'user' && (
                        <p className="login-signup-link">
                            Don’t have an account? <Link to="/signup">Sign Up</Link>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
