import { apiFetch } from './api';

export const getExams = () => apiFetch('/exams');

export const getExam = (id) => apiFetch(`/exams/${id}`);

export const createExam = (data) =>
  apiFetch('/exams', { method: 'POST', body: JSON.stringify(data) });

export const updateExam = (id, data) =>
  apiFetch(`/exams/${id}`, { method: 'PUT', body: JSON.stringify(data) });

export const deleteExam = (id) =>
  apiFetch(`/exams/${id}`, { method: 'DELETE' });

export const getExamResults = (id) => apiFetch(`/exams/${id}/results`);
