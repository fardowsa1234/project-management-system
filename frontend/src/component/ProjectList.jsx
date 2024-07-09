import React, { useState, useEffect } from 'react';

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ name: '', description: '', memberCount: 0 });

  useEffect(() => {
    // Fetch projects from the API
    fetch('/projects')
      .then(response => response.json())
      .then(data => setProjects(data))
      .catch(error => console.error('Error fetching projects:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Post a new project to the API
    fetch('/projects/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newProject)
    })
      .then(response => response.json())
      .then(data => {
        setProjects([...projects, data]);
        setNewProject({ name: '', description: '', memberCount: 0 }); // Reset the form
      })
      .catch(error => console.error('Error posting project:', error));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Projects</h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map(project => (
          <div key={project.id} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">{project.name}</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">{project.description}</p>
            </div>
            <div className="bg-gray-50 px-4 py-4 sm:px-6">
              <span className="text-sm font-medium text-gray-500">Members: {project.memberCount}</span>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-4 mt-6">Add a New Project</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow overflow-hidden sm:rounded-md px-4 py-5 sm:p-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Project Name</label>
          <input
            type="text"
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            value={newProject.name}
            onChange={e => setNewProject({ ...newProject, name: e.target.value })}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            value={newProject.description}
            onChange={e => setNewProject({ ...newProject, description: e.target.value })}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Member Count</label>
          <input
            type="number"
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            value={newProject.memberCount}
            onChange={e => setNewProject({ ...newProject, memberCount: parseInt(e.target.value) })}
            required
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Project
        </button>
      </form>
    </div>
  );
}

export default ProjectList;
