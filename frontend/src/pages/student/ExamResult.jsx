import { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { getMyResults, getResultDetail } from '../../services/myService';
import CorrectionView from '../../components/exams/CorrectionView';
import ErrorMessage from '../../components/ErrorMessage';


export default function ExamResult() {
  const { id } = useParams();
  const location = useLocation();
  const [result, setResult] = useState(location.state?.result || null);
  const [loading, setLoading] = useState(!location.state?.result);
  const [error, setError] = useState('');
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (result) return;

    getMyResults()
      .then(async (attempts) => {
        const attempt = attempts.find((a) => String(a.exam_id) === String(id) && a.status === 'submitted');
        if (!attempt) {
          setNotFound(true);
          return;
        }
        const detail = await getResultDetail(attempt.id);
        setResult(detail);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id, result]);

  if (loading) return <p>Chargement...</p>;
  if (notFound) {
    return (
      <div>
        <p className="empty-state">Vous n'avez pas encore de résultat pour cet examen.</p>
        <Link to="/student" className="btn">← Voir les examens disponibles</Link>
      </div>
    );
  }
  if (error) return <ErrorMessage message={error} />;
  if (!result) return null;

  const { attempt, correction } = result;

  return (
    <div>
      <h1>Résultat de l'examen</h1>
      <div className="score-banner">
        Note : <strong>{attempt.score} / 20</strong>
      </div>
      <h3>Correction</h3>
      <CorrectionView correction={correction} />
      <Link to="/student/results" className="btn">Voir mon historique</Link>
    </div>
  );
}
