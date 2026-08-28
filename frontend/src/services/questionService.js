import { apiFetch } from './api';

export const getQuestions = (examId) => apiFetch(`/exams/${examId}/questions`);

export const addQuestion = (examId, data) =>
  apiFetch(`/exams/${examId}/questions`, {
    method: 'POST',
    body: JSON.stringify(data),
  });

export const updateQuestion = (id, data) =>
  apiFetch(`/questions/${id}`, { method: 'PUT', body: JSON.stringify(data) });

export const deleteQuestion = (id) =>
  apiFetch(`/questions/${id}`, { method: 'DELETE' });
