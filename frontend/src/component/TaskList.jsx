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
      <ul className="list-group mb-4">
        {tasks.map(task => (
          <li key={task.id} className="list-group-item border-gray-200">
            <div className="px-4 py-4">
              <div className="d-flex justify-content-between">
                <h3 className="text-lg font-weight-bold text-gray-900">{task.title}</h3>
                <p className="mt-1 text-sm text-muted">Author: {task.author}</p>
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
        <Form className="bg-white shadow-sm rounded px-4 pt-4 pb-4 mb-4">
          <div className="mb-3">
            <label htmlFor="title" className="form-label text-gray-700">
              Title
            </label>
            <Field
              type="text"
              name="title"
              className="form-control"
            />
            <ErrorMessage name="title" component="div" className="text-danger small" />
          </div>
          <div className="mb-3">
            <label htmlFor="author" className="form-label text-gray-700">
              Author
            </label>
            <Field
              type="text"
              name="author"
              className="form-control"
            />
            <ErrorMessage name="author" component="div" className="text-danger small" />
          </div>
          <div className="mb-3">
            <label htmlFor="content" className="form-label text-gray-700">
              Content
            </label>
            <Field
              as="textarea"
              name="content"
              className="form-control"
              rows="3"
            />
            <ErrorMessage name="content" component="div" className="text-danger small" />
          </div>
          <div className="d-flex justify-content-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary"
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
