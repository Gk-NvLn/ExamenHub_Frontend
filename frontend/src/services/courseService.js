import { apiFetch } from './api';

export const getCourses = () => apiFetch('/courses');

export const createCourse = (code, name, description) =>
  apiFetch('/courses', {
    method: 'POST',
    body: JSON.stringify({ code, name, description }),
  });

export const updateCourse = (id, code, name, description) =>
  apiFetch(`/courses/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ code, name, description }),
  });

export const deleteCourse = (id) =>
  apiFetch(`/courses/${id}`, { method: 'DELETE' });
