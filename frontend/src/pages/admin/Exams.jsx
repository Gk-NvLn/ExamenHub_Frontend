import { useEffect, useState } from 'react';
import { getExams, createExam, updateExam, deleteExam } from '../../services/examService';
import { getCourses } from '../../services/courseService';
import ExamForm from '../../components/exams/ExamForm';
import ExamTable from '../../components/exams/ExamTable';
import ErrorMessage from '../../components/ErrorMessage';

export default function Exams() {
  const [exams, setExams] = useState([]);
  const [courses, setCourses] = useState([]);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const load = () => {
    Promise.all([getExams(), getCourses()])
      .then(([examsData, coursesData]) => {
        setExams(examsData);
        setCourses(coursesData);
      })
      .catch((err) => setError(err.message));
  };

  useEffect(load, []);

  const handleSubmit = async (data) => {
    setError('');
    setSubmitting(true);
    try {
      if (editing) {
        await updateExam(editing.id, data);
        setEditing(null);
      } else {
        await createExam(data);
      }
      load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer cet examen ?')) return;
    setError('');
    try {
      await deleteExam(id);
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Gestion des examens</h1>
      <ErrorMessage message={error} />

      <ExamForm
        initialData={editing}
        courses={courses}
        onSubmit={handleSubmit}
        onCancel={editing ? () => setEditing(null) : null}
        submitting={submitting}
      />

      <h3>Liste des examens</h3>
      <ExamTable exams={exams} onEdit={setEditing} onDelete={handleDelete} />
    </div>
  );
}
