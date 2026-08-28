
export default function ChoiceInput({ index, choice, onChange, onRemove, canRemove }) {
  return (
    <div className="choice-row">
      <input
        type="radio"
        name="correct-choice"
        checked={choice.is_correct}
        onChange={() => onChange(index, { ...choice, is_correct: true })}
        title="Bonne réponse"
      />
      <input
        type="text"
        className="choice-text"
        placeholder={`Choix ${index + 1}`}
        value={choice.text}
        onChange={(e) => onChange(index, { ...choice, text: e.target.value })}
        required
      />
      {canRemove && (
        <button type="button" className="btn btn-sm btn-ghost" onClick={() => onRemove(index)}>
          Retirer
        </button>
      )}
    </div>
  );
}
