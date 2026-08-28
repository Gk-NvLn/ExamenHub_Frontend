import { apiFetch } from './api';

export const getStudents = () => apiFetch('/students');

export const createStudent = (name, email, password) =>
  apiFetch('/students', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  });

export const updateStudent = (id, name, email) =>
  apiFetch(`/students/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ name, email }),
  });

export const resetStudentPassword = (id, password) =>
  apiFetch(`/students/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ password }),
  });

export const setStudentActive = (id, is_active) =>
  apiFetch(`/students/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ is_active }),
  });

export const deactivateStudent = (id) =>
  apiFetch(`/students/${id}`, { method: 'DELETE' });
