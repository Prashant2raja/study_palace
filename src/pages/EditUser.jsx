import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './EditUser.css';

export default function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    father_name: '',
    mob_number: '',
    email: '',
    address: '',
    gov_id: '',
    seat_number: '',
    time_slot: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://studypalacebackend-production.up.railway.app/api/signup`)
      .then(res => {
        const user = res.data.find(u => u.id === +id);
        if (!user) throw new Error('Not found');
        setForm({
          name: user.name || '',
          father_name: user.father_name || '',
          mob_number: user.mob_number || '',
          email: user.email || '',
          address: user.address || '',
          gov_id: user.gov_id || '',
          seat_number: user.seat_number || '',
          time_slot: user.time_slot || ''
        });
      })
      .catch(() => alert('Failed to load user'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.put(`https://studypalacebackend-production.up.railway.app/api/signup/${id}`, form);
      alert('User updated');
      navigate('/admin/users');  // redirect to user list page
    } catch {
      alert('Update failed');
    }
  };

  if (loading) return <p>Loading…</p>;

  return (
    <div className="edit-user-container">
      <h2>Edit User #{id}</h2>
      <form onSubmit={handleSubmit} className="edit-user-form">
        {[
          { label: 'Name', name: 'name' },
          { label: 'Father Name', name: 'father_name' },
          { label: 'Mobile', name: 'mob_number' },
          { label: 'Email', name: 'email', type: 'email' },
          { label: 'Address', name: 'address' },
          { label: 'Gov ID', name: 'gov_id' },
          { label: 'Seat Number', name: 'seat_number' },
        ].map(({ label, name, type = 'text' }) => (
          <div key={name} className="field-row">
            <label>{label}</label>
            <input
              type={type}
              name={name}
              value={form[name]}
              onChange={handleChange}
            />
          </div>
        ))}

        {/* Replace time_slot input with select dropdown */}
        <div className="field-row">
          <label>Time Slot</label>
          <select
            name="time_slot"
            value={form.time_slot}
            onChange={handleChange}
          >
            <option value="">-- Select Time Slot --</option>
            <option value="7am-12pm">7am-12pm</option>
            <option value="12pm-5pm">12pm-5pm</option>
            <option value="5pm-10pm">5pm-10pm</option>
            <option value="7am-10pm">7am-10pm</option>
          </select>
        </div>

        <div className="button-row">
          <button type="submit" className="btn-save">Save</button>
          <button type="button" className="btn-cancel" onClick={() => navigate(-1)}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
