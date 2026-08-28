import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getExam, getExamResults } from '../../services/examService';
import ResultsTable from '../../components/results/ResultsTable';
import ErrorMessage from '../../components/ErrorMessage';


export default function ExamResults() {
  const { id } = useParams();
  const [exam, setExam] = useState(null);
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getExam(id), getExamResults(id)])
      .then(([examData, resultsData]) => {
        setExam(examData);
        setResults(resultsData);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Chargement...</p>;

  const submitted = results.filter((r) => r.status === 'submitted' && r.score !== null);
  const average = submitted.length
    ? (submitted.reduce((sum, r) => sum + Number(r.score), 0) / submitted.length).toFixed(2)
    : null;

  return (
    <div>
      <Link to="/admin/exams" className="back-link">← Retour aux examens</Link>
      <h1>Résultats — {exam?.title}</h1>
      <ErrorMessage message={error} />

      <div className="stat-grid">
        <div className="stat-card">
          <span className="stat-value">{results.length}</span>
          <span className="stat-label">Tentatives</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{average ?? '—'}</span>
          <span className="stat-label">Moyenne / 20</span>
        </div>
      </div>

      <ResultsTable results={results} />
    </div>
  );
}
