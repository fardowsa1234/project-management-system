import React from 'react';

const UserDetails = ({ user }) => {
  return (
    <div className="bg-white p-4 shadow rounded">
      <h2 className="text-xl font-semibold mb-2">User Details</h2>
      <p className="text-gray-700">Username: {user.username}</p>
      <p className="text-gray-700">Email: {user.email}</p>
      {/* Potentially list posts by the user */}
    </div>
  );
};

export default UserDetails;
