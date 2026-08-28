import { useState } from 'react';
import QuestionForm from './QuestionForm';

// RG-08 : dès qu'un examen a au moins une tentative, ses questions/choix
// deviennent non modifiables et non supprimables — le verrouillage est visible ici.
export default function QuestionList({ questions, locked, onUpdate, onDelete }) {
  const [editingId, setEditingId] = useState(null);

  if (questions.length === 0) {
    return <p className="empty-state">Aucune question pour cet examen.</p>;
  }

  return (
    <div className="question-list">
      {locked && (
        <div className="alert alert-info">
          🔒 Cet examen a déjà des tentatives : les questions ne sont plus modifiables.
        </div>
      )}
      {questions.map((q, idx) => (
        <div key={q.id} className="question-card">
          {editingId === q.id ? (
            <QuestionForm
              initialData={q}
              onSubmit={async (data) => {
                await onUpdate(q.id, data);
                setEditingId(null);
              }}
              onCancel={() => setEditingId(null)}
            />
          ) : (
            <>
              <div className="question-card-header">
                <h4>Q{idx + 1}. {q.statement} <span className="points-badge">{q.points} pt{q.points > 1 ? 's' : ''}</span></h4>
                {!locked && (
                  <div className="actions-cell">
                    <button className="btn btn-sm" onClick={() => setEditingId(q.id)}>Modifier</button>
                    <button className="btn btn-sm btn-danger" onClick={() => onDelete(q.id)}>Supprimer</button>
                  </div>
                )}
              </div>
              <ul className="choice-list">
                {q.choices?.map((c) => (
                  <li key={c.id} className={c.is_correct ? 'choice-correct' : ''}>
                    {c.text} {c.is_correct && '✓'}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
