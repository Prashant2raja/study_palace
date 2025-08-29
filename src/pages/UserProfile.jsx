import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';

// --- SVG Icons for Buttons ---
const EditIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>;
const DeleteIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>;

export default function UserProfile() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userToDelete, setUserToDelete] = useState(null); // For custom confirm modal

    const fetchUsers = () => {
        setLoading(true);
        axios
            .get('https://studypalacebackend-production.up.railway.app/api/signup')
            .then((res) => setUsers(res.data))
            .catch(() => setError('Failed to fetch user data. Please try again.'))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(
                `https://studypalacebackend-production.up.railway.app/api/admin/user/${id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchUsers(); // Refresh list
        } catch (error) {
            console.error('Delete failed:', error.response?.data || error.message);
            alert('Failed to delete user.');
        } finally {
            setUserToDelete(null); // Close modal
        }
    };

    const handleEdit = (id) => {
        navigate(`/admin/edit-user/${id}`);
    };

    if (loading) {
        return (
            <div className="admin-page">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading User Records...</p>
                </div>
            </div>
        );
    }
    
    if (error) {
         return (
            <div className="admin-page">
                <div className="error-container">
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-page">
            <div className="admin-container">
                <h1 className="page-title">User Management</h1>
                <p className="page-subtitle">View, edit, or delete user signup records.</p>
                
                <div className="table-wrapper">
                    <table className="user-table">
                        <thead>
                            <tr>
                                {['ID', 'Photo', 'Name', 'Email', 'Mobile', 'Seat No', 'Time Slot', 'Created At', 'Actions'].map((h) => (
                                    <th key={h}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>
                                        <img src={user.photo || 'https://placehold.co/64x64/AB47BC/FFFFFF?text=N/A'} alt="avatar" className="avatar-img" />
                                    </td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.mob_number}</td>
                                    <td>{user.seat_number || '—'}</td>
                                    <td>{user.time_slot || '—'}</td>
                                    <td>{new Date(user.created_at).toLocaleDateString()}</td>
                                    <td className="actions-cell">
                                        <button onClick={() => handleEdit(user.id)} className="btn btn-edit"><EditIcon /></button>
                                        <button onClick={() => setUserToDelete(user)} className="btn btn-delete"><DeleteIcon /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            
            {/* Custom Confirmation Modal */}
            {userToDelete && (
                <div className="popup-overlay">
                    <div className="popup-content confirm-modal">
                        <h3>Confirm Deletion</h3>
                        <p>Are you sure you want to delete the record for <strong>{userToDelete.name}</strong> (ID: {userToDelete.id})? This action cannot be undone.</p>
                        <div className="popup-actions">
                            <button className="btn-popup btn-cancel" onClick={() => setUserToDelete(null)}>Cancel</button>
                            <button className="btn-popup btn-confirm-delete" onClick={() => handleDelete(userToDelete.id)}>Yes, Delete</button>
                        </div>
                    </div>
                </div>
            )}

            <footer className="site-footer">
                <p>&copy; 2025 BUDHA LIBRARY. All Rights Reserved.</p>
            </footer>
        </div>
    );
}
