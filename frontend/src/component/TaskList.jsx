import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    fetch('/tasks')
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error('Error fetching tasks:', error));
  };

  const addTask = (task) => {
    fetch('/tasks/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    })
      .then(response => response.json())
      .then(() => fetchTasks())
      .catch(error => console.error('Error adding task:', error));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Tasks</h2>
      <ul className="bg-white shadow overflow-hidden sm:rounded-md mb-4">
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
      <TaskForm onTaskAdded={addTask} />
    </div>
  );
}

function TaskForm({ onTaskAdded }) {
  const initialValues = { title: '', author: '', content: '' };

  const validationSchema = Yup.object({
    title: Yup.string().required('Required'),
    author: Yup.string().required('Required'),
    content: Yup.string().required('Required')
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    onTaskAdded(values);
    resetForm();
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
              Title
            </label>
            <Field
              type="text"
              name="title"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <ErrorMessage name="title" component="div" className="text-red-500 text-xs italic" />
          </div>
          <div className="mb-4">
            <label htmlFor="author" className="block text-gray-700 text-sm font-bold mb-2">
              Author
            </label>
            <Field
              type="text"
              name="author"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <ErrorMessage name="author" component="div" className="text-red-500 text-xs italic" />
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">
              Content
            </label>
            <Field
              as="textarea"
              name="content"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <ErrorMessage name="content" component="div" className="text-red-500 text-xs italic" />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {isSubmitting ? 'Submitting...' : 'Add Task'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default TaskList;
