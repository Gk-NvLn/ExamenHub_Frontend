import { useState } from 'react';

// Formulaire de création d'un étudiant (nom, email, mot de passe initial).
export default function StudentForm({ onSubmit, submitting }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit({ name, email, password });
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <form className="panel-form" onSubmit={handleSubmit}>
      <h3>Ajouter un étudiant</h3>
      <div className="form-grid">
        <label className="field">
          <span>Nom complet</span>
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label className="field">
          <span>Email</span>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label className="field">
          <span>Mot de passe initial</span>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
        </label>
      </div>
      <button type="submit" className="btn btn-primary" disabled={submitting}>
        Créer le compte
      </button>
    </form>
  );
}
