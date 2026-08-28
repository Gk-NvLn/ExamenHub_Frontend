import { useEffect, useState } from 'react';
import { getCourses, createCourse, updateCourse, deleteCourse } from '../../services/courseService';
import CourseForm from '../../components/courses/CourseForm';
import CourseTable from '../../components/courses/CourseTable';
import ErrorMessage from '../../components/ErrorMessage';

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const load = () => {
    getCourses()
      .then(setCourses)
      .catch((err) => setError(err.message));
  };

  useEffect(load, []);

  const handleSubmit = async (data) => {
    setError('');
    setSubmitting(true);
    try {
      if (editing) {
        await updateCourse(editing.id, data.code, data.name, data.description);
        setEditing(null);
      } else {
        await createCourse(data.code, data.name, data.description);
      }
      load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer ce cours ?')) return;
    setError('');
    try {
      await deleteCourse(id);
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Gestion des cours</h1>
      <ErrorMessage message={error} />

      <CourseForm
        initialData={editing}
        onSubmit={handleSubmit}
        onCancel={editing ? () => setEditing(null) : null}
        submitting={submitting}
      />

      <h3>Liste des cours</h3>
      <CourseTable courses={courses} onEdit={setEditing} onDelete={handleDelete} />
    </div>
  );
}
