import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import 'bootstrap/dist/css/bootstrap.min.css';

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
    <div className="container">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Project Memberships</h2>
      <div className="row">
        <div className="col-md-6">
          <ul className="list-group">
            {memberships.map(membership => (
              <li key={membership.id} className="list-group-item">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="text-sm font-medium text-indigo-600">
                    {membership.user} - {membership.project}
                  </p>
                  <div>
                    <span className="badge bg-success">{membership.role}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-6">
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
        <Form>
          <div className="mb-3">
            <label htmlFor="user_id" className="form-label">User</label>
            <Field
              as="select"
              name="user_id"
              className="form-select"
            >
              <option value="">Select a user</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </Field>
            <ErrorMessage name="user_id" component="div" className="text-danger small" />
          </div>
          <div className="mb-3">
            <label htmlFor="project_id" className="form-label">Project</label>
            <Field
              as="select"
              name="project_id"
              className="form-select"
            >
              <option value="">Select a project</option>
              {projects.map(project => (
                <option key={project.id} value={project.id}>{project.name}</option>
              ))}
            </Field>
            <ErrorMessage name="project_id" component="div" className="text-danger small" />
          </div>
          <div className="mb-3">
            <label htmlFor="role" className="form-label">Role</label>
            <Field
              type="text"
              name="role"
              className="form-control"
            />
            <ErrorMessage name="role" component="div" className="text-danger small" />
          </div>
          <div className="d-grid gap-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary"
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
