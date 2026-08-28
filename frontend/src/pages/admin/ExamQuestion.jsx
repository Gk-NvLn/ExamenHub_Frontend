import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getExam, getExamResults } from '../../services/examService';
import { getQuestions, addQuestion, updateQuestion, deleteQuestion } from '../../services/questionService';
import QuestionForm from '../../components/questions/QuestionForm';
import QuestionList from '../../components/questions/QuestionList';
import ErrorMessage from '../../components/ErrorMessage';

export default function ExamQuestions() {
  const { id } = useParams();
  const [exam, setExam] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [locked, setLocked] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const load = async () => {
    try {
      const [examData, questionsData, resultsData] = await Promise.all([
        getExam(id),
        getQuestions(id),
        getExamResults(id),
      ]);
      setExam(examData);
      setQuestions(questionsData);
      setLocked((resultsData?.length ?? 0) > 0);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [id]);

  const handleAdd = async (data) => {
    setError('');
    setSubmitting(true);
    try {
      await addQuestion(id, data);
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateQuestion = async (questionId, data) => {
    setError('');
    try {
      await updateQuestion(questionId, data);
      await load();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteQuestion = async (questionId) => {
    if (!window.confirm('Supprimer cette question ?')) return;
    setError('');
    try {
      await deleteQuestion(questionId);
      await load();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Chargement...</p>;

  return (
    <div>
      <Link to="/admin/exams" className="back-link">← Retour aux examens</Link>
      <h1>Questions — {exam?.title}</h1>
      <ErrorMessage message={error} />

      <QuestionList
        questions={questions}
        locked={locked}
        onUpdate={handleUpdateQuestion}
        onDelete={handleDeleteQuestion}
      />

      {!locked && (
        <QuestionForm onSubmit={handleAdd} submitting={submitting} />
      )}
    </div>
  );
}
