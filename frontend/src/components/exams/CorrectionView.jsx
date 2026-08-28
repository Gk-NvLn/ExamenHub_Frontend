export default function CorrectionView({ correction }) {
  return (
    <div className="correction-view">
      {correction.map((item) => (
        <div
          key={item.answer_id ?? item.question_id}
          className={`correction-item ${item.is_correct ? 'correct' : 'incorrect'}`}
        >
          <p className="question">{item.question_label || item.question_statement}</p>
          <p>Votre réponse : {item.selected_choice_label || item.selected_choice_text || '— (sans réponse)'}</p>
          {!item.is_correct && (
            <p className="correct-answer">
              Bonne réponse : {item.correct_choice_label || item.correct_choice_text}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
