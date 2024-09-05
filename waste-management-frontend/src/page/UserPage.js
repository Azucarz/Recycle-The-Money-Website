import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserPage = () => {
  const [user, setUser] = useState(null);
  const [location, setLocation] = useState('');
  const [userId] = useState(1); // Replace with actual user ID

  useEffect(() => {
    // Fetch user data
    axios.get(`http://localhost:3000/user/${userId}`)
      .then(response => setUser(response.data))
      .catch(error => console.error('Error fetching user data:', error));
  }, [userId]);

  const handleReportBin = () => {
    axios.post('http://localhost:3000/report-bin', { userId, location })
      .then(response => {
        alert('Bin reported successfully!');
        setLocation('');
      })
      .catch(error => console.error('Error reporting bin:', error));
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1>User Page</h1>
      <p>Name: {user.name}</p>
      <p>Location: {user.location}</p>
      <p>Points: {user.points}</p>
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Enter bin location"
      />
      <button onClick={handleReportBin}>Report Full Bin</button>
    </div>
  );
};

export default UserPage;
