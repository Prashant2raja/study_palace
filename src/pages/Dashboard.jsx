import React from 'react';
import './Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard-container">
      {/* --- Welcome Banner Section --- */}
      <div className="welcome-banner">
        <div className="welcome-overlay"></div>
        <div className="welcome-content">
          <img src="src/assets/p3.png" alt="Left Icon" className="side-icon moving-image glowing-logo" />
          <div>
            <h1 className="dashboard-heading">Welcome to BUDHA LIBRARY</h1>
            <p className="dashboard-paragraph">
              A serene space for you to manage your resources and expand your knowledge.
            </p>
          </div>
          <img src="src/assets/p2.png" alt="Right Icon" className="side-icon moving-image glowing-logo" />
        </div>
      </div>

      {/* --- Main Content Area --- */}
      <div className="content-container">

        {/* --- Important Notification --- */}
        <div className="notification-card animate-on-scroll">
          <div className="notification-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-alert-triangle"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
          </div>
          <div className="notification-text">
            <h3>Important Notice</h3>
            <p>Batch movement is only allowed within 7 days after payment.</p>
          </div>
        </div>

        {/* --- Interactive Elements & Quick Links --- */}
        <div className="interactive-section">
          <div className="earth-container animate-on-scroll">
            <div className="earth"></div>
            <div className="moon"></div>
          </div>
          <div className="quick-links-card animate-on-scroll">
            <h2>Quick Access</h2>
            <ul>
              <li><a href="#books">Explore New Books</a></li>
              <li><a href="#courses">My Enrolled Courses</a></li>
              <li><a href="#profile">Update My Profile</a></li>
              <li><a href="#support">Contact Support</a></li>
            </ul>
          </div>
        </div>

        {/* --- Library Content Sections --- */}
        <div className="library-section animate-on-scroll" id="books">
          <h2>Featured Collections</h2>
          <p>Discover our curated collections on philosophy, science, and history.</p>
        </div>

        <div className="library-section animate-on-scroll" id="courses">
          <h2>Your Progress</h2>
          <p>Continue your learning journey and track your course completion.</p>
        </div>
      </div>

      {/* --- Footer --- */}
      <footer className="dashboard-footer">
        <p>&copy; 2025 BUDHA LIBRARY. All Rights Reserved.</p>
        <div className="footer-links">
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
        </div>
      </footer>
    </div>
  );
}

export default Dashboard;
