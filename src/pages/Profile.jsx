import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    mob_number: '',
    address: '',
    seat_number: '',
    time_slot: '',
    photo: null,
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const token = localStorage.getItem('token');
  const email = localStorage.getItem('userEmail');
  const authHeader = { Authorization: `Bearer ${token}` };
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || !email) {
      alert('Unauthorized access. Please log in.');
      navigate('/login');
      return;
    }

    axios.get(`https://studypalacebackend-production.up.railway.app/user/${email}`, { headers: authHeader })
      .then(res => {
        setUser(res.data);
        setFormData({
          name: res.data.name || '',
          mob_number: res.data.mob_number || '',
          address: res.data.address || '',
          seat_number: res.data.seat_number || '',
          time_slot: res.data.time_slot || '',
          photo: null,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        setPreview(res.data.photo || null);
      })
      .catch(err => {
        console.error(err);
        alert('Could not fetch profile.');
      });
  }, [editing, navigate, token, email]);

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === 'photo') {
      setFormData(prev => ({ ...prev, photo: files[0] }));
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      alert('New passwords do not match.');
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, val]) => {
      if (val !== null && val !== '') data.append(key, val);
    });

    console.log('FormData entries:', Array.from(data.entries()));

    try {
      await axios.put(
        `https://studypalacebackend-production.up.railway.app/user/${email}`,
        data,
        { headers: authHeader }
      );
      alert('Profile updated.');
      setEditing(false);
    } catch (err) {
      console.error(err);
      alert('Update failed.');
    }
  };

  if (!user) return <p>Loading...</p>;

  // Parse & format booked date
  const bookedDateObj = user.created_at ? new Date(user.created_at) : null;
  const formattedBookedDate = bookedDateObj
    ? bookedDateObj.toISOString().split('T')[0].replace(/-/g, '/')
    : 'NA';

  // Valid till = booked + 30 days
  const validTillObj = bookedDateObj
    ? new Date(bookedDateObj.getTime() + 30 * 24 * 60 * 60 * 1000)
    : null;
  const formattedValidTill = validTillObj
    ? validTillObj.toISOString().split('T')[0].replace(/-/g, '/')
    : 'NA';

  // Days left
  const validDays = validTillObj
  ? Math.ceil((validTillObj - new Date()) / (24 * 60 * 60 * 1000))
  : 0;


  // **NEW**: decide amount and show Pay button if unpaid
  const amountToPay = user.time_slot === '7am-10pm' ? 2 : 1;
  const showPayButton = user.seat_number && user.paid === 0;

  return (
    <div className="profile-container">
      <img
        src={preview || user.photo}
        alt="Avatar"
        className="profile-avatar"
      />

      {editing ? (
        <form onSubmit={handleSubmit} className="profile-form">
          <input name="photo" type="file" accept="image/*" onChange={handleChange} />

          <input
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Full Name"
          />

          <input
            name="mob_number"
            type="text"
            value={formData.mob_number}
            onChange={handleChange}
            required
            placeholder="Mobile Number"
          />

          <input
            name="address"
            type="text"
            value={formData.address}
            onChange={handleChange}
            required
            placeholder="Address"
          />

          {/* Seat & Time Slot (uncomment if needed)
          <select name="seat_number" value={formData.seat_number} onChange={handleChange}>
            <option value="">NA</option>
            {[...Array(130)].map((_, i) => (
              <option key={i+1} value={i+1}>{i+1}</option>
            ))}
          </select>

          <select name="time_slot" value={formData.time_slot} onChange={handleChange}>
            <option value="">NA</option>
            {timeSlots.map((slot, idx) => (
              <option key={idx} value={slot}>{slot}</option>
            ))}
          </select>
          */}

          <input
            name="currentPassword"
            type="password"
            value={formData.currentPassword}
            onChange={handleChange}
            placeholder="Current Password"
            required
          />
          <input
            name="newPassword"
            type="password"
            value={formData.newPassword}
            onChange={handleChange}
            placeholder="New Password"
          />
          <input
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm New Password"
          />

          <button type="submit" className="btn-save">Save</button>
          <button type="button" className="btn-cancel" onClick={() => setEditing(false)}>Cancel</button>
        </form>
      ) : (
        <>
          <h2 className="profile-name">{user.name}</h2>
          <p className="profile-info"><strong>Email:</strong> {user.email}</p>
          <p className="profile-info"><strong>Mobile:</strong> {user.mob_number}</p>
          <p className="profile-info"><strong>Address:</strong> {user.address}</p>
          <p className="profile-info"><strong>Seat Number:</strong> {user.seat_number || 'NA'}</p>
          <p className="profile-info"><strong>Time Slot:</strong> {user.time_slot || 'NA'}</p>
          <p className="profile-info"><strong>Booked Date:</strong> {formattedBookedDate}</p>
          <p className="profile-info"><strong>Valid till:</strong> {formattedValidTill} ({validDays} days left)</p>

          {showPayButton && (
            <button
              className="btn-pay"
              onClick={() =>
                navigate(
                  `/payments?seat=${user.seat_number}&slot=${user.time_slot}&amount=${amountToPay}`
                )
              }
            >
              Pay ₹{amountToPay}
            </button>
          )}

          <div className="profile-id-section">
            <h4>Govt ID:</h4>
            <p>{user.gov_id}</p>
          </div>

          <button className="btn-edit" onClick={() => setEditing(true)}>Edit Profile</button>
        </>
      )}
    </div>
  );
}
