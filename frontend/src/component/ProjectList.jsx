import React, { useState, useEffect } from 'react';

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ name: '', description: '', memberCount: 0 });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = () => {
    fetch('/projects')
      .then(response => response.json())
      .then(data => setProjects(data))
      .catch(error => console.error('Error fetching projects:', error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
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
    <div className="container mt-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Projects</h2>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 gap-4">
        {projects.map(project => (
          <div key={project.id} className="col mb-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h3 className="card-title h5 font-weight-bold text-gray-900">{project.name}</h3>
                <p className="card-text text-sm text-muted">{project.description}</p>
              </div>
              <div className="card-footer bg-light">
                <small className="text-muted">Members: {project.memberCount}</small>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-4 mt-6">Add a New Project</h2>
      <form onSubmit={handleSubmit} className="card shadow-sm p-4">
        <div className="mb-3">
          <label htmlFor="projectName" className="form-label font-weight-bold text-gray-700">Project Name</label>
          <input
            type="text"
            className="form-control"
            id="projectName"
            placeholder="Enter project name"
            value={newProject.name}
            onChange={e => setNewProject({ ...newProject, name: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="projectDescription" className="form-label font-weight-bold text-gray-700">Description</label>
          <textarea
            className="form-control"
            id="projectDescription"
            rows="3"
            placeholder="Enter project description"
            value={newProject.description}
            onChange={e => setNewProject({ ...newProject, description: e.target.value })}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="memberCount" className="form-label font-weight-bold text-gray-700">Member Count</label>
          <input
            type="number"
            className="form-control"
            id="memberCount"
            placeholder="Enter member count"
            value={newProject.memberCount}
            onChange={e => setNewProject({ ...newProject, memberCount: parseInt(e.target.value) })}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Project</button>
      </form>
    </div>
  );
}

export default ProjectList;
