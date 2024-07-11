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
      <div className="container-fluid bg-light min-vh-100">
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
          <div className="container">
            <Link to="/" className="navbar-brand text-dark font-weight-bold" style={{ fontSize: '20px', fontFamily: 'Playfair Display' }}>Project Management System</Link>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav ml-auto">
                <NavLink to="/users">Users</NavLink>
                <NavLink to="/tasks">Tasks</NavLink>
                <NavLink to="/projects">Projects</NavLink>
                <NavLink to="/memberships">Memberships</NavLink>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container mt-4">
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
  <li className="nav-item">
    <Link to={to} className="nav-link text-dark font-weight-bold" style={{ fontSize: '20px' }}>{children}</Link>
  </li>
);

function Home() {
  return (
    <div className="text-center mt-5">
      <h1 className="text-dark display-4 font-weight-bold mb-4">Welcome to My App</h1>
      <p className="lead text-secondary" style={{ fontSize: '20px', fontFamily: 'Playfair Display' }}>Manage your users, tasks, projects, and memberships all in one place.</p>
    </div>
  );
}

export default App;
