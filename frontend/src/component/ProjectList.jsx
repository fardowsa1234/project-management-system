import React, { useState, useEffect } from 'react';

function ProjectList() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Fetch projects
  }, []);

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
    </div>
  );
}

export default ProjectList;