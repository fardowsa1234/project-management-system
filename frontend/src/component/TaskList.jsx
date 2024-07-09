import React, { useState, useEffect } from 'react';

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch tasks
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Tasks</h2>
      <ul className="bg-white shadow overflow-hidden sm:rounded-md">
        {tasks.map(task => (
          <li key={task.id} className="border-b border-gray-200 last:border-b-0">
            <div className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg leading-6 font-medium text-gray-900">{task.title}</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Author: {task.author}</p>
              </div>
              <p className="mt-1 text-sm text-gray-600">{task.content.substring(0, 150)}...</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;