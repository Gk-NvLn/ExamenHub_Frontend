import { useState, useEffect } from 'react';
import ChoiceInput from './ChoiceInput';

const emptyChoice = () => ({ text: '', is_correct: false });

export default function QuestionForm({ initialData, onSubmit, onCancel, submitting }) {
  const [statement, setStatement] = useState('');
  const [points, setPoints] = useState(1);
  const [choices, setChoices] = useState([emptyChoice(), emptyChoice()]);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (initialData) {
      setStatement(initialData.statement || '');
      setPoints(initialData.points ?? 1);
      setChoices(
        initialData.choices?.length
          ? initialData.choices.map((c) => ({ text: c.text, is_correct: !!c.is_correct }))
          : [emptyChoice(), emptyChoice()]
      );
    }
  }, [initialData]);

  const updateChoice = (index, value) => {
    setChoices((prev) => prev.map((c, i) => (i === index ? value : { ...c, is_correct: value.is_correct ? false : c.is_correct })));
  };

  const addChoice = () => {
    if (choices.length >= 6) return;
    setChoices((prev) => [...prev, emptyChoice()]);
  };

  const removeChoice = (index) => {
    if (choices.length <= 2) return;
    setChoices((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (choices.length < 2 || choices.length > 6) {
      setFormError('Une question doit avoir entre 2 et 6 choix.');
      return;
    }
    if (choices.some((c) => !c.text.trim())) {
      setFormError('Tous les choix doivent avoir un texte.');
      return;
    }
    if (choices.filter((c) => c.is_correct).length !== 1) {
      setFormError('Exactement un choix doit être marqué comme correct.');
      return;
    }

    await onSubmit({ statement, points: Number(points), choices });

    if (!initialData) {
      setStatement('');
      setPoints(1);
      setChoices([emptyChoice(), emptyChoice()]);
    }
  };

  return (
    <form className="panel-form" onSubmit={handleSubmit}>
      <h3>{initialData ? 'Modifier la question' : 'Ajouter une question'}</h3>

      {formError && <div className="alert alert-error">{formError}</div>}

      <label className="field field-wide">
        <span>Énoncé</span>
        <textarea value={statement} onChange={(e) => setStatement(e.target.value)} required rows={2} />
      </label>

      <label className="field">
        <span>Points</span>
        <input type="number" min={0} value={points} onChange={(e) => setPoints(e.target.value)} required />
      </label>

      <div className="choices-editor">
        <span className="field-label">Choix de réponse (cochez la bonne réponse)</span>
        {choices.map((choice, i) => (
          <ChoiceInput
            key={i}
            index={i}
            choice={choice}
            onChange={updateChoice}
            onRemove={removeChoice}
            canRemove={choices.length > 2}
          />
        ))}
        <button type="button" className="btn btn-sm" onClick={addChoice} disabled={choices.length >= 6}>
          + Ajouter un choix
        </button>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {initialData ? 'Enregistrer' : 'Ajouter la question'}
        </button>
        {onCancel && (
          <button type="button" className="btn btn-ghost" onClick={onCancel}>Annuler</button>
        )}
      </div>
    </form>
  );
}
