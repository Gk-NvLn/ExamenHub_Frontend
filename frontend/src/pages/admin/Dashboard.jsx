import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getStudents } from '../../services/studentService';
import { getCourses } from '../../services/courseService';
import { getExams } from '../../services/examService';
import ErrorMessage from '../../components/ErrorMessage';

export default function Dashboard() {
  const [stats, setStats] = useState({ students: 0, courses: 0, exams: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([getStudents(), getCourses(), getExams()])
      .then(([students, courses, exams]) => {
        setStats({ students: students.length, courses: courses.length, exams: exams.length });
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Chargement...</p>;

  return (
    <div>
      <h1>Tableau de bord</h1>
      <ErrorMessage message={error} />

      <div className="stat-grid">
        <Link to="/admin/students" className="stat-card">
          <span className="stat-value">{stats.students}</span>
          <span className="stat-label">Étudiants</span>
        </Link>
        <Link to="/admin/courses" className="stat-card">
          <span className="stat-value">{stats.courses}</span>
          <span className="stat-label">Cours</span>
        </Link>
        <Link to="/admin/exams" className="stat-card">
          <span className="stat-value">{stats.exams}</span>
          <span className="stat-label">Examens</span>
        </Link>
      </div>

      <div className="quick-links">
        <Link to="/admin/students" className="btn">Gérer les étudiants</Link>
        <Link to="/admin/courses" className="btn">Gérer les cours</Link>
        <Link to="/admin/exams" className="btn">Gérer les examens</Link>
      </div>
    </div>
  );
}
