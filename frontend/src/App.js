import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import UserList from './component/UserList';
import UserDetail from './component/UserDetail';
import TaskList from './component/TaskList';
import ProjectList from './component/ProjectList';
import ProjectMembershipList from './component/ProjectMembershipList';
import UserForm from './component/UserForm';

function App() {
  const addUser = (user) => {
    console.log('Adding user:', user);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-lg">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between items-center py-4">
              <Link to="/" className="font-semibold text-gray-500 text-lg">Project Management System</Link>
              <div className="hidden md:flex items-center space-x-4">
                <NavLink to="/users">Users</NavLink>
                <NavLink to="/tasks">Tasks</NavLink>
                <NavLink to="/projects">Projects</NavLink>
                <NavLink to="/memberships">Memberships</NavLink>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-6xl mx-auto mt-8 px-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/users/:id" element={<UserDetail />} />
            <Route path="/tasks" element={<TaskList />} />
            <Route path="/projects" element={<ProjectList />} />
            <Route path="/memberships" element={<ProjectMembershipList />} />
            <Route path="/add-user" element={<UserForm addUser={addUser} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

const NavLink = ({ to, children }) => (
  <Link to={to} className="text-gray-500 font-semibold hover:text-green-500 transition duration-300">{children}</Link>
);

function Home() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to My App</h1>
      <p className="text-xl text-gray-600">Manage your users, tasks, projects, and memberships all in one place.</p>
    </div>
  );
}

export default App;
