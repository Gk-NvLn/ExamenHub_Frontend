import { useState, useEffect } from 'react';

export default function CourseForm({ initialData, onSubmit, onCancel, submitting }) {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setCode(initialData?.code || '');
    setName(initialData?.name || '');
    setDescription(initialData?.description || '');
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit({ code, name, description });
    if (!initialData) {
      setCode('');
      setName('');
      setDescription('');
    }
  };

  return (
    <form className="panel-form" onSubmit={handleSubmit}>
      <h3>{initialData ? 'Modifier le cours' : 'Ajouter un cours'}</h3>
      <div className="form-grid">
        <label className="field">
          <span>Code (ex. WEB2)</span>
          <input value={code} onChange={(e) => setCode(e.target.value)} required />
        </label>
        <label className="field">
          <span>Nom du cours</span>
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label className="field field-wide">
          <span>Description</span>
          <input value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
      </div>
      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {initialData ? 'Enregistrer' : 'Créer le cours'}
        </button>
        {onCancel && (
          <button type="button" className="btn btn-ghost" onClick={onCancel}>Annuler</button>
        )}
      </div>
    </form>
  );
}
