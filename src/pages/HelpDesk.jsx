import React from "react";
import "./HelpDesk.css"; // Optional: for custom styling

const HelpDesk = () => {
  return (
    <div className="helpdesk-container">
      <h1>HelpDesk</h1>
      <section className="terms">
        <h2>Terms and Conditions</h2>
        <ul>
          <li>Each person is allowed to book only <strong>one seat</strong>.</li>
          <li><strong>Payments are non-refundable</strong> once made.</li>
          <li>After <strong>30 days</strong> from the last booking, you can book a new seat.</li>
          <li>You can choose your preferred <strong>time slot</strong> during booking.</li>
          <li>Update your <strong>password and profile</strong> from the <em>Profile</em> section under the <strong>Edit</strong> option.</li>
        </ul>
      </section>

      <section className="support">
        <h2>Help & Support 24x7</h2>
        <p>
          <strong>Email:</strong> example@gmail.com<br />
          <strong>Mobile:</strong> xxxxxxxxxx<br />
          <strong>Address:</strong> Budha Library , Rajapul  Jal Parishad Boring Road Patna <strong>(80001)</strong> 
        </p>
      </section>
    </div>
  );
};

export default HelpDesk;
