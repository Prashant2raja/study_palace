import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import './Navbar.css';

export default function NavBar() {
    const navigate = useNavigate();
    const role = localStorage.getItem('role');
    const [menuOpen, setMenuOpen] = useState(false); // ← mobile toggle

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("role");
        console.log("User logged out");
        navigate("/login");
    };

    const toggleMenu = () => setMenuOpen(!menuOpen); // ← toggle handler
    const closeMenu = () => setMenuOpen(false); // ← close on nav click

    return (
        <nav className="navbar">
            {/* Hamburger icon */}
            <button className="navbar__hamburger" onClick={toggleMenu}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </button>

            <ul className={`navbar__list ${menuOpen ? 'open' : ''}`}>
                {role === 'admin' ? (
                    <>
                        <li className="navbar__item" onClick={closeMenu}>
                            <NavLink to="/dashboard" className="navbar__link" activeClassName="active">
                                Home
                            </NavLink>
                        </li>
                        <li className="navbar__item" onClick={closeMenu}>
                            <NavLink to="/admin/dashboard" className="navbar__link" activeClassName="active">
                                Student Profile
                            </NavLink>
                        </li>
                        <li className="navbar__item" onClick={closeMenu}>
                            <NavLink to="/book" className="navbar__link">
                                Seat Booking
                            </NavLink>
                        </li>
                    </>
                ) : (
                    <>
                        <li className="navbar__item" onClick={closeMenu}>
                            <NavLink to="/dashboard" className="navbar__link" activeClassName="active">
                                Home
                            </NavLink>
                        </li>
                        <li className="navbar__item" onClick={closeMenu}>
                            <NavLink to="/profile" className="navbar__link" activeClassName="active">
                                Profile
                            </NavLink>
                        </li>
                        <li className="navbar__item" onClick={closeMenu}>
                            <NavLink to="/book" className="navbar__link" activeClassName="active">
                                Seat Booking
                            </NavLink>
                        </li>
                        <li className="navbar__item" onClick={closeMenu}>
                            <NavLink to="/payments" className="navbar__link" activeClassName="active">
                                Payments
                            </NavLink>
                        </li>
                        <li className="navbar__item" onClick={closeMenu}>
                            <NavLink to="/helpdesk" className="navbar__link" activeClassName="active">
                                HelpDesk
                            </NavLink>
                        </li>
                    </>
                )}
                <li className="navbar__item" onClick={closeMenu}>
                    <button type="button" onClick={handleLogout} className="navbar__button">
                        Logout
                    </button>
                </li>
            </ul>
        </nav>
    );
}
