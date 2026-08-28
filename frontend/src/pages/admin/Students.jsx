import { useEffect, useState } from 'react';
import {
  getStudents,
  createStudent,
  updateStudent,
  resetStudentPassword,
  setStudentActive,
} from '../../services/studentService';
import StudentForm from '../../components/students/StudentForm';
import StudentTable from '../../components/students/StudentTable';
import ErrorMessage from '../../components/ErrorMessage';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const load = () => {
    getStudents()
      .then(setStudents)
      .catch((err) => setError(err.message));
  };

  useEffect(load, []);

  const handleCreate = async (data) => {
    setError('');
    setSubmitting(true);
    try {
      await createStudent(data.name, data.email, data.password);
      load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdate = async (id, name, email) => {
    setError('');
    try {
      await updateStudent(id, name, email);
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleResetPassword = async (id, password) => {
    setError('');
    try {
      await resetStudentPassword(id, password);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleToggleActive = async (id, active) => {
    setError('');
    try {
      await setStudentActive(id, active);
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Gestion des étudiants</h1>
      <ErrorMessage message={error} />

      <StudentForm onSubmit={handleCreate} submitting={submitting} />

      <h3>Liste des étudiants</h3>
      <StudentTable
        students={students}
        onUpdate={handleUpdate}
        onResetPassword={handleResetPassword}
        onToggleActive={handleToggleActive}
      />
    </div>
  );
}
