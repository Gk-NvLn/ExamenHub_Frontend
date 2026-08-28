import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { startExam, submitExam } from '../../services/myService';
import SubmitConfirmModal from '../../components/exams/SubmitConfirmModal';
import ErrorMessage from '../../components/ErrorMessage';

export default function TakeExam() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    startExam(id)
      .then((data) => setQuestions(data.questions))
      .catch((err) => setError(err.message || "Impossible d'accéder à cet examen"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSelect = (questionId, choiceId) => {
    setResponses((prev) => ({ ...prev, [questionId]: choiceId }));
  };

  const answeredCount = Object.keys(responses).length;

  const handleSubmit = async () => {
    setSubmitting(true);
    setError('');
    try {
      const answers = Object.entries(responses).map(([question_id, choice_id]) => ({
        question_id: Number(question_id),
        choice_id: Number(choice_id),
      }));
      const result = await submitExam(id, answers);
      navigate(`/student/exams/${id}/result`, { state: { result } });
    } catch (err) {
      setError(err.message || 'Erreur lors de la soumission');
      setSubmitting(false);
      setShowConfirm(false);
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (error && questions.length === 0) return <ErrorMessage message={error} />;

  return (
    <div className="take-exam">
      <h1>Examen en cours</h1>
      <ErrorMessage message={error} />
      <p className="muted">{answeredCount} / {questions.length} question{questions.length > 1 ? 's' : ''} répondue{answeredCount > 1 ? 's' : ''}</p>

      {questions.map((q, idx) => (
        <div key={q.id} className="question-block">
          <p className="question-label">Q{idx + 1}. {q.statement} <span className="points-badge">{q.points} pt{q.points > 1 ? 's' : ''}</span></p>
          {q.choices.map((c) => (
            <label key={c.id} className="choice">
              <input
                type="radio"
                name={`question-${q.id}`}
                checked={responses[q.id] === c.id}
                onChange={() => handleSelect(q.id, c.id)}
              />
              {c.text}
            </label>
          ))}
        </div>
      ))}

      <button className="btn btn-primary" onClick={() => setShowConfirm(true)}>
        Terminer l'examen
      </button>

      {showConfirm && (
        <SubmitConfirmModal
          answeredCount={answeredCount}
          totalCount={questions.length}
          onConfirm={handleSubmit}
          onCancel={() => setShowConfirm(false)}
          submitting={submitting}
        />
      )}
    </div>
  );
}
