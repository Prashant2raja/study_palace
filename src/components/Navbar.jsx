import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import '/components/Navbar.css';


// Simple SVG icon for the logo
const LogoIcon = () => (
  <svg height="32" width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20v2H6.5A2.5 2.5 0 0 1 4 16.5v-11A2.5 2.5 0 0 1 6.5 3H20v2H6.5A2.5 2.5 0 0 1 4 7.5v12zM20 3v14h-2V3h2z" fill="currentColor"/>
  </svg>
);


export default function NavBar() {
    const navigate = useNavigate();
    const role = localStorage.getItem('role');
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        setMenuOpen(false); // Close menu on logout
        localStorage.removeItem("token");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("role");
        navigate("/login");
    };

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const closeMenu = () => setMenuOpen(false);

    // Effect to disable body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : 'unset';
    }, [menuOpen]);

    // Use function in className for NavLink to apply active class in React Router v6
    const getLinkClass = ({ isActive }) => "navbar__link" + (isActive ? " active" : "");

    return (
        <header className="navbar-container">
            <nav className="navbar">
                <NavLink to="/dashboard" className="navbar__brand" onClick={closeMenu}>
                    <LogoIcon />
                    <h1>BUDHA LIBRARY</h1>
                </NavLink>

                <button 
                    className={`navbar__hamburger ${menuOpen ? 'open' : ''}`} 
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                    aria-expanded={menuOpen}
                >
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </button>

                <div className={`navbar__menu-container ${menuOpen ? 'open' : ''}`}>
                    <ul className="navbar__list">
                        {role === 'admin' ? (
                            <>
                                <li className="navbar__item"><NavLink to="/dashboard" className={getLinkClass} onClick={closeMenu}>Home</NavLink></li>
                                <li className="navbar__item"><NavLink to="/admin/dashboard" className={getLinkClass} onClick={closeMenu}>Student Profile</NavLink></li>
                                <li className="navbar__item"><NavLink to="/book" className={getLinkClass} onClick={closeMenu}>Seat Booking</NavLink></li>
                            </>
                        ) : (
                            <>
                                <li className="navbar__item"><NavLink to="/dashboard" className={getLinkClass} onClick={closeMenu}>Home</NavLink></li>
                                <li className="navbar__item"><NavLink to="/profile" className={getLinkClass} onClick={closeMenu}>Profile</NavLink></li>
                                <li className="navbar__item"><NavLink to="/book" className={getLinkClass} onClick={closeMenu}>Seat Booking</NavLink></li>
                                <li className="navbar__item"><NavLink to="/payments" className={getLinkClass} onClick={closeMenu}>Payments</NavLink></li>
                                <li className="navbar__item"><NavLink to="/helpdesk" className={getLinkClass} onClick={closeMenu}>HelpDesk</NavLink></li>
                            </>
                        )}
                    </ul>
                    <button type="button" onClick={handleLogout} className="navbar__button btn-logout">
                        Logout
                    </button>
                </div>
                {menuOpen && <div className="navbar__backdrop" onClick={closeMenu}></div>}
            </nav>
        </header>
    );
}
