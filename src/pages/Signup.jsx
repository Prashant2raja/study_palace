import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: '', fatherName: '', email: '',
    phone: '', password: '', address: '', govId: ''
  });
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handlePhoto = e => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    // basic validation
    for (let key of Object.keys(form)) {
      if (!form[key]) {
        alert(`Please fill in ${key}`);
        return;
      }
    }
    const data = new FormData();
    Object.entries(form).forEach(([k, v]) => data.append(k, v));
    if (photo) data.append('photo', photo);

    try {
      // let axios set Content-Type with proper boundary
      const res = await axios.post('http://localhost:8080/signup', data);
      alert(res.data.message);
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || 'Signup failed');
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-heading">Sign Up</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="signup-photo-group">
          {preview && <img src={preview} alt="Preview" className="signup-photo-preview" />}
          <label className="signup-photo-label">
            {preview ? 'Change Photo' : 'Upload Photo'}
            <input name="photo" type="file" accept="image/*" onChange={handlePhoto} required />
          </label>
        </div>
        {[
          { label: 'Full Name', name: 'fullName' },
          { label: "Father's Name", name: 'fatherName' },
          { label: 'Email', name: 'email', type: 'email' },
          { label: 'Phone', name: 'phone', type: 'tel' },
          { label: 'Password', name: 'password', type: 'password' },
          { label: 'Address', name: 'address', textarea: true },
          { label: 'Government ID', name: 'govId' }
        ].map(({ label, name, type='text', textarea }) => (
          <div className="signup-field" key={name}>
            <label>{label} *</label>
            {textarea
              ? <textarea name={name} value={form[name]} onChange={handleChange} required />
              : <input type={type} name={name} value={form[name]} onChange={handleChange} required />}
          </div>
        ))}
        <button type="submit" className="signup-button">Sign Up</button>
        <p className="signup-login-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
