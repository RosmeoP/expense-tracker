import  { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');  // Assuming the token is stored in localStorage

    if (token) {
      axios
        .get('http://localhost:3000/api/profile', {
          headers: {
            Authorization: `Bearer ${token}`,  // Sending the token to the backend
          },
        })
        .then((response) => {
          setUser(response.data.user);  // Set user data for the dashboard
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    }
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome, {user.email}!</p>
      <p>User ID: {user.id}</p>
    </div>
  );
};

export default Dashboard;
