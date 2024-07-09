import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch user data from the API
    fetch('/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">User List</h2>
      <div className="bg-white shadow-md rounded-lg p-4">
        {users.map(user => (
          <Link
            key={user.id}
            to={`/users/${user.id}`}
            className="block p-4 border-b border-gray-200 hover:bg-gray-100"
          >
            {user.username}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UserList;
