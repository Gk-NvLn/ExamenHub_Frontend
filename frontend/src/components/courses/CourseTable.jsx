export default function CourseTable({ courses, onEdit, onDelete }) {
  if (courses.length === 0) {
    return <p className="empty-state">Aucun cours pour le moment.</p>;
  }

  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>Code</th>
          <th>Nom</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {courses.map((c) => (
          <tr key={c.id}>
            <td>{c.code}</td>
            <td>{c.name}</td>
            <td>{c.description}</td>
            <td className="actions-cell">
              <button className="btn btn-sm" onClick={() => onEdit(c)}>Modifier</button>
              <button className="btn btn-sm btn-danger" onClick={() => onDelete(c.id)}>Supprimer</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
