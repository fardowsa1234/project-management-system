import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import UserList from './component/UserList';
import UserDetail from './component/UserDetail';
import PostList from './component/PostList';
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
            <div className="flex justify-between">
              <div className="flex space-x-7">
                <div>
                  <Link to="/" className="flex items-center py-4 px-2">
                    <span className="font-semibold text-gray-500 text-lg">My App</span>
                  </Link>
                </div>
                <div className="hidden md:flex items-center space-x-1">
                  <Link to="/users" className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">Users</Link>
                  <Link to="/posts" className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">Posts</Link>
                  <Link to="/projects" className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">Projects</Link>
                  <Link to="/memberships" className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">Memberships</Link>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-6xl mx-auto mt-8 px-4">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/users" component={UserList} />
            <Route path="/users/:id" component={UserDetail} />
            <Route path="/posts" component={PostList} />
            <Route path="/projects" component={ProjectList} />
            <Route path="/memberships" component={ProjectMembershipList} />
            {/* Route for UserForm */}
            <Route path="/add-user" render={() => <UserForm addUser={addUser} />} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to My App</h1>
      <p className="text-xl text-gray-600">Manage your users, posts, projects, and memberships all in one place.</p>
    </div>
  );
}

export default App;
