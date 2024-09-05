import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPage = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    // Fetch all reports
    axios.get('http://localhost:3000/admin/reports')
      .then(response => setReports(response.data))
      .catch(error => console.error('Error fetching reports:', error));
  }, []);

  const handleMarkAsCollected = (id) => {
    axios.patch(`http://localhost:3000/admin/reports/${id}`, { status: 'collected' })
      .then(response => {
        alert('Report updated!');
        setReports(reports.map(report => report.id === id ? { ...report, status: 'collected' } : report));
      })
      .catch(error => console.error('Error updating report:', error));
  };

  return (
    <div>
      <h1>Admin Page</h1>
      <ul>
        {reports.map(report => (
          <li key={report.id}>
            <p>User ID: {report.user_id}</p>
            <p>Location: {report.location}</p>
            <p>Status: {report.status}</p>
            <button onClick={() => handleMarkAsCollected(report.id)}>
              Mark as Collected
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;
