const fmt = (iso) => (iso ? new Date(iso).toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' }) : '—');

// Table des résultats d'un examen : étudiant, note, statut, dates (vue admin).
export default function ResultsTable({ results }) {
  if (!results || results.length === 0) {
    return <p className="empty-state">Aucune tentative pour cet examen.</p>;
  }

  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>Étudiant</th>
          <th>Note</th>
          <th>Statut</th>
          <th>Début</th>
          <th>Soumission</th>
        </tr>
      </thead>
      <tbody>
        {results.map((r) => (
          <tr key={r.id}>
            <td>{r.student_name || r.student_email || `#${r.student_id}`}</td>
            <td>{r.score !== null && r.score !== undefined ? `${r.score} / 20` : '—'}</td>
            <td>{r.status === 'submitted' ? 'Soumis' : 'En cours'}</td>
            <td>{fmt(r.started_at)}</td>
            <td>{fmt(r.submitted_at)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
