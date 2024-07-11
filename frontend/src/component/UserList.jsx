import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user details
    fetch(`/users/${id}`)
      .then(response => response.json())
      .then(data => setUser(data))
      .catch(error => console.error('Error fetching user details:', error));
  }, [id]);

  if (!user) {
    return <div className="container mt-4">Loading...</div>; // Bootstrap class for margin top
  }

  return (
    <div className="container mt-4"> {/* Bootstrap class for margin top */}
      <h2 className="text-2xl font-weight-bold mb-4">User Detail</h2> {/* Bootstrap class for font weight */}
      <div className="bg-white shadow-sm rounded p-4"> {/* Bootstrap classes for shadow and padding */}
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        {/* Display other user details as needed */}
      </div>
    </div>
  );
};

export default UserDetail;
