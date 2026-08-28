// Confirmation avant soumission (soumission unique — RG-02).
export default function SubmitConfirmModal({ answeredCount, totalCount, onConfirm, onCancel, submitting }) {
  const unanswered = totalCount - answeredCount;

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h3>Confirmer la soumission</h3>
        <p>
          Vous avez répondu à {answeredCount} question{answeredCount > 1 ? 's' : ''} sur {totalCount}.
        </p>
        {unanswered > 0 && (
          <p className="alert alert-info">
            {unanswered} question{unanswered > 1 ? 's restent' : ' reste'} sans réponse et vaudra 0 point (RG-05).
          </p>
        )}
        <p><strong>Attention :</strong> une fois soumis, vous ne pourrez plus repasser cet examen.</p>
        <div className="form-actions">
          <button className="btn btn-primary" onClick={onConfirm} disabled={submitting}>
            {submitting ? 'Envoi...' : 'Confirmer et soumettre'}
          </button>
          <button className="btn btn-ghost" onClick={onCancel} disabled={submitting}>
            Revenir à l'examen
          </button>
        </div>
      </div>
    </div>
  );
}
