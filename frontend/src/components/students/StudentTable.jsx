import { useState } from 'react';

export default function StudentTable({ students, onUpdate, onResetPassword, onToggleActive }) {
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [resettingId, setResettingId] = useState(null);
  const [newPassword, setNewPassword] = useState('');

  const startEdit = (s) => {
    setEditingId(s.id);
    setEditName(s.name);
    setEditEmail(s.email);
  };

  const saveEdit = async (id) => {
    await onUpdate(id, editName, editEmail);
    setEditingId(null);
  };

  const saveReset = async (id) => {
    if (!newPassword) return;
    await onResetPassword(id, newPassword);
    setResettingId(null);
    setNewPassword('');
  };

  if (students.length === 0) {
    return <p className="empty-state">Aucun étudiant pour le moment.</p>;
  }

  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>Nom</th>
          <th>Email</th>
          <th>Statut</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {students.map((s) => (
          <tr key={s.id}>
            <td>
              {editingId === s.id ? (
                <input value={editName} onChange={(e) => setEditName(e.target.value)} />
              ) : (
                s.name
              )}
            </td>
            <td>
              {editingId === s.id ? (
                <input value={editEmail} onChange={(e) => setEditEmail(e.target.value)} />
              ) : (
                s.email
              )}
            </td>
            <td>
              <span className={`badge ${s.is_active ? 'badge-success' : 'badge-muted'}`}>
                {s.is_active ? 'Actif' : 'Désactivé'}
              </span>
            </td>
            <td className="actions-cell">
              {editingId === s.id ? (
                <>
                  <button className="btn btn-sm btn-primary" onClick={() => saveEdit(s.id)}>Enregistrer</button>
                  <button className="btn btn-sm btn-ghost" onClick={() => setEditingId(null)}>Annuler</button>
                </>
              ) : resettingId === s.id ? (
                <>
                  <input
                    type="text"
                    placeholder="Nouveau mot de passe"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <button className="btn btn-sm btn-primary" onClick={() => saveReset(s.id)}>Valider</button>
                  <button className="btn btn-sm btn-ghost" onClick={() => setResettingId(null)}>Annuler</button>
                </>
              ) : (
                <>
                  <button className="btn btn-sm" onClick={() => startEdit(s)}>Modifier</button>
                  <button className="btn btn-sm" onClick={() => setResettingId(s.id)}>Réinitialiser mot de passe</button>
                  <button
                    className={`btn btn-sm ${s.is_active ? 'btn-danger' : ''}`}
                    onClick={() => onToggleActive(s.id, !s.is_active)}
                  >
                    {s.is_active ? 'Désactiver' : 'Réactiver'}
                  </button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
