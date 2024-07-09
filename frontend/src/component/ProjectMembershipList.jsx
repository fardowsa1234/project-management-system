import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function ProjectMembershipList() {
  const [memberships, setMemberships] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]); 

  useEffect(() => {
    // Fetch memberships
    fetch('/projects/')
      .then(response => response.json())
      .then(data => setMemberships(data))
      .catch(error => console.error('Error fetching memberships:', error));

    // Fetch projects
    fetch('/projects')
      .then(response => response.json())
      .then(data => setProjects(data))
      .catch(error => console.error('Error fetching projects:', error));

    // Fetch users
    fetch('/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const refreshMemberships = () => {
    fetch('/projects/')
      .then(response => response.json())
      .then(data => setMemberships(data))
      .catch(error => console.error('Error fetching memberships:', error));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Project Memberships</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <ul className="bg-white shadow overflow-hidden sm:rounded-md">
            {memberships.map(membership => (
              <li key={membership.id} className="border-b border-gray-200 last:border-b-0">
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-indigo-600 truncate">
                      {membership.user} - {membership.project}
                    </p>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {membership.role}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Add New Membership</h3>
          <ProjectMembershipForm
            projects={projects}
            users={users}
            onMembershipAdded={refreshMemberships}
          />
        </div>
      </div>
    </div>
  );
}

function ProjectMembershipForm({ projects, users, onMembershipAdded }) {
  const initialValues = { user_id: '', project_id: '', role: '' };

  const validationSchema = Yup.object({
    user_id: Yup.string().required('Required'),
    project_id: Yup.string().required('Required'),
    role: Yup.string().required('Required'),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    fetch(`/projects/${values.project_id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: values.user_id,
        role: values.role
      })
    })
    .then(response => response.json())
    .then(() => {
      onMembershipAdded();
      resetForm();
      setSubmitting(false);
    })
    .catch(error => {
      console.error('Error posting membership:', error);
      setSubmitting(false);
    });
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
            <label htmlFor="user_id" className="block text-gray-700 text-sm font-bold mb-2">
              User
            </label>
            <Field
              as="select"
              name="user_id"
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select a user</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </Field>
            <ErrorMessage name="user_id" component="div" className="text-red-500 text-xs italic" />
          </div>
          <div className="mb-4">
            <label htmlFor="project_id" className="block text-gray-700 text-sm font-bold mb-2">
              Project
            </label>
            <Field
              as="select"
              name="project_id"
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select a project</option>
              {projects.map(project => (
                <option key={project.id} value={project.id}>{project.name}</option>
              ))}
            </Field>
            <ErrorMessage name="project_id" component="div" className="text-red-500 text-xs italic" />
          </div>
          <div className="mb-6">
            <label htmlFor="role" className="block text-gray-700 text-sm font-bold mb-2">
              Role
            </label>
            <Field
              type="text"
              name="role"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <ErrorMessage name="role" component="div" className="text-red-500 text-xs italic" />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {isSubmitting ? 'Submitting...' : 'Add Membership'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default ProjectMembershipList;
