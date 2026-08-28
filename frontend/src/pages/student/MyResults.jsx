import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMyResults } from '../../services/myService';
import ErrorMessage from '../../components/ErrorMessage';

const fmt = (iso) => (iso ? new Date(iso).toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' }) : '—');

export default function MyResults() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getMyResults()
      .then(setResults)
      .catch((err) => setError(err.message || 'Impossible de charger vos résultats'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Chargement...</p>;

  return (
    <div>
      <h1>Mes résultats</h1>
      <ErrorMessage message={error} />

      {results.length === 0 ? (
        <p className="empty-state">Vous n'avez encore passé aucun examen.</p>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>Examen</th>
              <th>Note</th>
              <th>Statut</th>
              <th>Soumis le</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {results.map((r) => (
              <tr key={r.id}>
                <td>Examen #{r.exam_id}</td>
                <td>{r.status === 'submitted' ? `${r.score} / 20` : '—'}</td>
                <td>{r.status === 'submitted' ? 'Soumis' : 'En cours'}</td>
                <td>{fmt(r.submitted_at)}</td>
                <td>
                  {r.status === 'submitted' && (
                    <Link to={`/student/exams/${r.exam_id}/result`}>Voir la correction</Link>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
