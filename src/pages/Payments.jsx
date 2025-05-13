// public/index.html — add this just before closing </body>
// <script src="https://checkout.razorpay.com/v1/checkout.js"></script>

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Payments.css';

export default function Payments() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const seat = params.get('seat');
  const slot = params.get('slot');
  const amountParam = params.get('amount');
  const amount = amountParam ? Number(amountParam) : 0;

  const handlePayment = async () => {
    try {
      // 1. Create order on server (amount in paise)
      const { data: order } = await axios.post(
        '/api/create-order',
        { amount: amount * 100, receipt: `rcpt_${Date.now()}` },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );

      // 2. Razorpay checkout options
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: 'BHUDDHA LIBRARY',
        description: `Seat ${seat}, ${slot}`,
        handler: async (response) => {
          try {
            // 3. Verify payment on server
            await axios.post(
              '/api/verify-payment',
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                seat_number: seat,
                time_slot: slot,
              },
              { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );
            alert('Payment successful!');
            navigate('/profile');
          } catch (verifyErr) {
            console.error('Verification error:', verifyErr);
            alert('Payment verification failed. Contact support.');
          }
        },
        modal: {
          ondismiss: () => alert('Payment popup closed.'),
        },
        prefill: {
          name: '',
          email: '',
        },
        theme: {
          color: '#3399cc',
        },
      };

      // 4. Open Razorpay popup
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error('Order creation error:', err);
      alert('Could not initiate payment. Please try again.');
    }
  };

  if (!seat || !slot || !amount) {
    return (
      <div className="payments-container">
        <p className="payment-error">
          Invalid payment details. Please go back to booking.
        </p>
      </div>
    );
  }

  return (
    <div className="payments-container">
      <h2 className="payments-title">Complete Payment</h2>
      <p>Seat: <strong>{seat}</strong></p>
      <p>Slot: <strong>{slot}</strong></p>
      <p>Please pay: <strong>₹{amount}</strong></p>
      <button className="payments-button" onClick={handlePayment}>
        Pay with UPI / Wallet
      </button>
    </div>
  );
}
