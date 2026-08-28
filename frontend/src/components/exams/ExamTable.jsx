import { Link } from 'react-router-dom';

const fmt = (iso) => (iso ? new Date(iso).toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' }) : '—');

export default function ExamTable({ exams, onEdit, onDelete }) {
  if (exams.length === 0) {
    return <p className="empty-state">Aucun examen pour le moment.</p>;
  }

  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>Titre</th>
          <th>Cours</th>
          <th>Fenêtre de disponibilité</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {exams.map((e) => (
          <tr key={e.id}>
            <td>{e.title}</td>
            <td>{e.course_name || e.course_code || e.course_id}</td>
            <td>{fmt(e.start_time)} → {fmt(e.end_time)}</td>
            <td className="actions-cell">
              <Link className="btn btn-sm" to={`/admin/exams/${e.id}/questions`}>Questions</Link>
              <Link className="btn btn-sm" to={`/admin/exams/${e.id}/results`}>Résultats</Link>
              <button className="btn btn-sm" onClick={() => onEdit(e)}>Modifier</button>
              <button className="btn btn-sm btn-danger" onClick={() => onDelete(e.id)}>Supprimer</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
