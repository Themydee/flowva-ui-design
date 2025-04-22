// src/pages/Dashboard.js

import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user session (adjust based on your auth logic)
    localStorage.removeItem('email');
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to Dashboard</h1>
      <button style={styles.button} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    background: '#f4f4f4',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '1.5rem',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
};

export default Dashboard;
