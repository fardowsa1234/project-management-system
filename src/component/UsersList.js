import React from 'react';

const UsersList = ({ users, selectUser }) => {
  return (
    <div className="bg-white p-4 shadow rounded">
      <h2 className="text-xl font-semibold mb-2">Users List</h2>
      <ul>
        {users.map((user, index) => (
          <li
            key={index}
            onClick={() => selectUser(user)}
            className="cursor-pointer text-blue-500 hover:underline"
          >
            {user.username}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
