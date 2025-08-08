// src/pages/UserProfile.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';

export default function UserProfile() {
  const navigate = useNavigate();
  const [users, setUsers]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  // Fetch signup records
  const fetchUsers = () => {
    setLoading(true);
    axios.get('https://studypalacebackend-production.up.railway.app/api/signup')
      .then(res => setUsers(res.data))
      .catch(() => setError('Failed to fetch data'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async id => {
  if (!window.confirm('Are you sure you want to delete this record?')) return;
  
  const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
  
  try {
    await axios.delete(`https://studypalacebackend-production.up.railway.app/api/admin/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    fetchUsers(); // Refresh the list after deletion
  } catch (error) {
    console.error('Delete failed:', error.response?.data || error.message);
    alert('Failed to delete');
  }
};


  const handleEdit = id => {
    navigate(`/admin/edit-user/${id}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error)   return <p>{error}</p>;

  return (
    <div className="container">
      <h2>Signup Records</h2>
      <table className="signup-table">
        <thead>
          <tr>
            {[
              'ID', 'Name', 'Father Name', 'Mobile', 'Email', 
              'Photo', 'Address', 'Gov ID', 'Created At', 'Seat No',
              'Time Slot', 'Updated At', 'Actions'
            ].map(h => <th key={h}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.father_name}</td>
              <td>{u.mob_number}</td>
              <td>{u.email}</td>
              {/* <td>{u.password}</td> */}
              <td><img src={u.photo} alt="avatar" className="avatar-img" /></td>
              <td>{u.address}</td>
              <td>{u.gov_id}</td>
              <td>{new Date(u.created_at).toLocaleString()}</td>
              <td>{u.seat_number}</td>
              <td>{u.time_slot}</td>
              <td>{new Date(u.updated_at).toLocaleString()}</td>
              <td className="actions-cell">
                <button onClick={() => handleEdit(u.id)} className="btn edit-btn">
                  Edit
                </button>
                <button onClick={() => handleDelete(u.id)} className="btn delete-btn">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
