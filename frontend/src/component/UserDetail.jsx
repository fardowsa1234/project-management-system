import React from 'react';
import { useParams } from 'react-router-dom';

const UserDetail = () => {
  const { id } = useParams();

  // Dummy user data (replace with actual data fetching and rendering logic)
  const user = { id: parseInt(id), username: 'john_doe', email: 'john@example.com' };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold my-4">User Detail</h2>
      <div className="bg-white shadow-md rounded-lg p-4">
        <div className="mb-4">
          <h5 className="text-lg font-semibold">Username: {user.username}</h5>
          <p className="text-gray-700">Email: {user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
