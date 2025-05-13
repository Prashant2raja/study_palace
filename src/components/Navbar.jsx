import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import './Navbar.css'; // Import your CSS file for styling

export default function NavBar() {
    const navigate = useNavigate();
    const role = localStorage.getItem('role'); // ← added to detect admin vs user

    const handleLogout = () => {
        // ✅ Clear user session data
        localStorage.removeItem("token");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("role"); // ← added role cleanup

        console.log("User logged out");
        navigate("/login"); // Redirect to login page
    };

    return (
        <nav className="navbar">
            <ul className="navbar__list">
                {role === 'admin' ? (
                    // Admin sees only Seat Booking and User Profile
                    <>
                    <li className="navbar__item">
                            <NavLink to="/dashboard" className="navbar__link" activeClassName="active">
                                Home
                            </NavLink>
                        </li>
                        <li className="navbar__item">
                            <NavLink to="/admin/dashboard" className="navbar__link" activeClassName="active">
                                Student Profile
                            </NavLink>
                        </li>
                        <li className="navbar__item">
                            <NavLink to="/book" className="navbar__link">
                                Seat Booking
                            </NavLink>
                        </li>
                    
                    </>
                ) : (
                    // Regular user sees full menu
                    <>
                        <li className="navbar__item">
                            <NavLink to="/dashboard" className="navbar__link" activeClassName="active">
                                Home
                            </NavLink>
                        </li>
                        <li className="navbar__item">
                            <NavLink to="/profile" className="navbar__link" activeClassName="active">
                                Profile
                            </NavLink>
                        </li>
                        <li className="navbar__item">
                            <NavLink to="/book" className="navbar__link" activeClassName="active">
                                Seat Booking
                            </NavLink>
                        </li>
                        <li className="navbar__item">
                            <NavLink to="/payments" className="navbar__link" activeClassName="active">
                                Payments
                            </NavLink>
                        </li>
                        <li className="navbar__item">
                            <NavLink to="/helpdesk" className="navbar__link" activeClassName="active">
                                HelpDesk
                            </NavLink>
                        </li>
                    </>
                )}

                <li className="navbar__item">
                    <button type="button" onClick={handleLogout} className="navbar__button">
                        Logout
                    </button>
                </li>
            </ul>
        </nav>
    );
}
