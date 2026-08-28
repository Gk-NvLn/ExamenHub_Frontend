import { useState, useEffect } from 'react';

const toLocalInput = (isoString) => {
  if (!isoString) return '';
  const d = new Date(isoString);
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

export default function ExamForm({ initialData, courses, onSubmit, onCancel, submitting }) {
  const [courseId, setCourseId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  useEffect(() => {
    setCourseId(initialData?.course_id ?? '');
    setTitle(initialData?.title || '');
    setDescription(initialData?.description || '');
    setStartTime(toLocalInput(initialData?.start_time));
    setEndTime(toLocalInput(initialData?.end_time));
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit({
      course_id: Number(courseId),
      title,
      description,
      start_time: new Date(startTime).toISOString(),
      end_time: new Date(endTime).toISOString(),
    });
    if (!initialData) {
      setTitle('');
      setDescription('');
      setStartTime('');
      setEndTime('');
    }
  };

  return (
    <form className="panel-form" onSubmit={handleSubmit}>
      <h3>{initialData ? "Modifier l'examen" : 'Créer un examen'}</h3>
      <div className="form-grid">
        <label className="field">
          <span>Cours</span>
          <select value={courseId} onChange={(e) => setCourseId(e.target.value)} required>
            <option value="">-- Sélectionner un cours --</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>{c.code} — {c.name}</option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>Titre</span>
          <input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <label className="field field-wide">
          <span>Description</span>
          <input value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <label className="field">
          <span>Ouverture</span>
          <input type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
        </label>
        <label className="field">
          <span>Fermeture</span>
          <input type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
        </label>
      </div>
      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {initialData ? 'Enregistrer' : "Créer l'examen"}
        </button>
        {onCancel && (
          <button type="button" className="btn btn-ghost" onClick={onCancel}>Annuler</button>
        )}
      </div>
    </form>
  );
}
