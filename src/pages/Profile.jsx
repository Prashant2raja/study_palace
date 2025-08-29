import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Profile.css';

// --- SVG Icons for a modern look ---
const EditIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>;
const SaveIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>;
const CancelIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;


export default function Profile() {
    const [user, setUser] = useState(null);
    const [editing, setEditing] = useState(false);
    const [preview, setPreview] = useState(null);
    const [showPasswordFields, setShowPasswordFields] = useState(false);
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        name: '', mob_number: '', address: '', photo: null,
        currentPassword: '', newPassword: '', confirmPassword: ''
    });

    const token = localStorage.getItem('token');
    const email = localStorage.getItem('userEmail');
    const navigate = useNavigate();

    useEffect(() => {
        if (!token || !email) {
            alert('Unauthorized access. Please log in.');
            navigate('/login');
            return;
        }

        const authHeader = { Authorization: `Bearer ${token}` };
        axios.get(`https://studypalacebackend-production.up.railway.app/api/user/${email}`, { headers: authHeader })
            .then(res => {
                setUser(res.data);
                setFormData({
                    name: res.data.name || '',
                    mob_number: res.data.mob_number || '',
                    address: res.data.address || '',
                    photo: null, currentPassword: '', newPassword: '', confirmPassword: ''
                });
                setPreview(res.data.photo || null);
            })
            .catch(err => {
                console.error(err);
                alert('Could not fetch profile. Please try logging in again.');
                navigate('/login');
            })
            .finally(() => setLoading(false));

    }, [navigate, token, email]);

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
            if (val) data.append(key, val);
        });

        try {
            const authHeader = { Authorization: `Bearer ${token}` };
            const response = await axios.put(`https://studypalacebackend-production.up.railway.app/api/user/${email}`, data, { headers: authHeader });
            setUser(response.data.user);
            alert('Profile updated successfully.');
            setEditing(false);
            setShowPasswordFields(false);
        } catch (err) {
            console.error(err);
            alert('Update failed. ' + (err.response?.data?.message || 'Please try again.'));
        }
    };
    
    if (loading) {
        return (
            <div className="profile-page">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading Your Profile...</p>
                </div>
            </div>
        );
    }

    const bookedDateObj = user.updated_at ? new Date(user.updated_at) : null;
    const validTillObj = bookedDateObj ? new Date(new Date(bookedDateObj).getTime() + 30 * 24 * 60 * 60 * 1000) : null;
    const formatDate = (date) => date ? new Intl.DateTimeFormat('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }).format(date) : 'N/A';
    
    const totalDays = 30;
    const daysLeft = validTillObj ? Math.max(0, Math.ceil((validTillObj - new Date()) / (1000 * 60 * 60 * 24))) : 0;
    const validityPercentage = (daysLeft / totalDays) * 100;

    const amountToPay = user.time_slot === '7am-10pm' ? 2 : 1;
    const showPayButton = user.seat_number && user.paid === 0;

    return (
        <div className="profile-page">
            <div className="profile-container">
                <div className="profile-header"></div>
                <div className="profile-content">
                    {editing ? (
                        <form onSubmit={handleSubmit} className="profile-form">
                             <div className="form-avatar-upload">
                                <img src={preview || 'https://placehold.co/150x150/AB47BC/FFFFFF?text=...'} alt="Avatar Preview" className="profile-avatar" />
                                <label htmlFor="photo-upload" className="btn btn-secondary">Change Photo</label>
                                <input id="photo-upload" name="photo" type="file" accept="image/*" onChange={handleChange} />
                            </div>
                            <h2 className="profile-name">{formData.name || "Edit Profile"}</h2>

                            <div className="section-title">Personal Information</div>
                            <input name="name" type="text" value={formData.name} onChange={handleChange} required placeholder="Full Name" />
                            <input name="mob_number" type="text" value={formData.mob_number} onChange={handleChange} required placeholder="Mobile Number" />
                            <textarea name="address" value={formData.address} onChange={handleChange} required placeholder="Address" rows="3" />
                            
                            <div className="section-title">Security</div>
                            <button type="button" className="btn btn-secondary" onClick={() => setShowPasswordFields(prev => !prev)}>
                                {showPasswordFields ? 'Cancel Password Change' : 'Change Password'}
                            </button>
                            {showPasswordFields && (
                                <div className="password-fields">
                                    <input name="currentPassword" type="password" value={formData.currentPassword} onChange={handleChange} placeholder="Current Password" required />
                                    <input name="newPassword" type="password" value={formData.newPassword} onChange={handleChange} placeholder="New Password" />
                                    <input name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm New Password" />
                                </div>
                            )}

                            <div className="form-actions">
                                <button type="button" className="btn btn-danger" onClick={() => setEditing(false)}><CancelIcon /> Cancel</button>
                                <button type="submit" className="btn btn-primary"><SaveIcon /> Save Changes</button>
                            </div>
                        </form>
                    ) : (
                        <div className="profile-view">
                            <img src={user.photo || 'https://placehold.co/150x150/AB47BC/FFFFFF?text=N/A'} alt="User Avatar" className="profile-avatar" />
                            <h2 className="profile-name">{user.name}</h2>
                            <p className="profile-email">{user.email}</p>

                            <div className="details-section">
                                <div className="section-title">Subscription Status</div>
                                <div className="details-grid">
                                    <div className="detail-item"><strong>Seat:</strong> {user.seat_number || 'N/A'}</div>
                                    <div className="detail-item"><strong>Slot:</strong> {user.time_slot || 'N/A'}</div>
                                    <div className="detail-item"><strong>Booked On:</strong> {formatDate(bookedDateObj)}</div>
                                    <div className="detail-item"><strong>Valid Till:</strong> {formatDate(validTillObj)}</div>
                                </div>
                                <div className="validity-progress">
                                    <div className="progress-bar-background">
                                        <div className="progress-bar-fill" style={{ width: `${validityPercentage}%` }}></div>
                                    </div>
                                    <p>{daysLeft} of {totalDays} days remaining</p>
                                </div>
                            </div>
                            
                            <div className="details-section">
                                <div className="section-title">Contact Information</div>
                                 <div className="details-grid">
                                    <div className="detail-item"><strong>Mobile:</strong> {user.mob_number || 'N/A'}</div>
                                    <div className="detail-item"><strong>Govt ID:</strong> {user.gov_id || 'N/A'}</div>
                                    <div className="detail-item full-width"><strong>Address:</strong> {user.address || 'N/A'}</div>
                                </div>
                            </div>

                            <div className="profile-actions">
                                {showPayButton && (
                                    <button className="btn btn-pay" onClick={() => navigate(`/payments?seat=${user.seat_number}&slot=${user.time_slot}&amount=${amountToPay}`)}>
                                        Pay Now (₹{amountToPay})
                                    </button>
                                )}
                                <button className="btn btn-primary" onClick={() => setEditing(true)}>
                                    <EditIcon /> Edit Profile
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <footer className="site-footer">
                <p>&copy; 2025 BUDHA LIBRARY. All Rights Reserved.</p>
            </footer>
        </div>
    );
}
