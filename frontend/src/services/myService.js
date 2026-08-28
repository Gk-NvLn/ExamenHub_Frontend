import { apiFetch } from './api';

export const getAvailableExams = () => apiFetch('/my/exams');

export const startExam = (examId) => apiFetch(`/my/exams/${examId}`);

export const submitExam = (examId, answers) =>
  apiFetch(`/my/exams/${examId}/submit`, {
    method: 'POST',
    body: JSON.stringify({ answers }),
  });

export const getMyResults = () => apiFetch('/my/results');

export const getResultDetail = (attemptId) => apiFetch(`/my/results/${attemptId}`);
