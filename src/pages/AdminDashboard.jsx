import React from 'react';

const UserProfile = () => {
  // Temporary mock data
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Software developer passionate about React and Node.js.',
    avatar: 'https://via.placeholder.com/150', // Placeholder image
  };

  return (
    <div style={styles.container}>
      <img src={user.avatar} alt="User Avatar" style={styles.avatar} />
      <h2>{user.name}</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p>{user.bio}</p>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '2rem auto',
    padding: '1.5rem',
    border: '1px solid #ddd',
    borderRadius: '10px',
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
  },
  avatar: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    marginBottom: '1rem',
  }
};

export default UserProfile;
