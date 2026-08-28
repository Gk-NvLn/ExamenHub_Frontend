import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAvailableExams } from '../../services/myService';
import ErrorMessage from '../../components/ErrorMessage';

export default function AvailableExams() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getAvailableExams()
      .then(setExams)
      .catch((err) => setError(err.message || 'Impossible de charger les examens disponibles'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Chargement...</p>;

  return (
    <div>
      <h1>Examens disponibles</h1>
      <ErrorMessage message={error} />

      {exams.length === 0 ? (
        <p className="empty-state">Aucun examen disponible pour le moment.</p>
      ) : (
        <div className="exam-card-list">
          {exams.map((exam) => (
            <div key={exam.id} className="exam-card">
              <div>
                <h3>{exam.title}</h3>
                <p className="muted">{exam.course_name}</p>
                {exam.description && <p>{exam.description}</p>}
              </div>
              <Link to={`/student/exams/${exam.id}`} className="btn btn-primary">
                Commencer
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
