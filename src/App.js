import React, { useState } from 'react';
import UsersList from './component/UsersList';
import UserForm from './component/UserForm';
import UserDetails from './component/UserDetails';

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const addUser = (user) => {
    setUsers([...users, user]);
  };

  const selectUser = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Project Management System</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <UserForm addUser={addUser} />
        </div>
        <div>
          <UsersList users={users} selectUser={selectUser} />
        </div>
        <div>
          {selectedUser && <UserDetails user={selectedUser} />}
        </div>
      </div>
    </div>
  );
};

export default App;
