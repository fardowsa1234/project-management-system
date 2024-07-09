import React from 'react';
import { Link } from 'react-router-dom';

const UserList = () => {
  // Dummy data (replace with actual data fetching and rendering logic)
  const users = [
    { id: 1, username: 'john_doe', email: 'john@example.com' },
    { id: 2, username: 'jane_smith', email: 'jane@example.com' },
  ];

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">User List</h2>
      <div className="divide-y divide-gray-200">
        {users.map((user) => (
          <Link
            key={user.id}
            to={`/users/${user.id}`}
            className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-md"
          >
            {user.username}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UserList;
