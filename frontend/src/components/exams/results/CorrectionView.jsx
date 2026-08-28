function CorrectionView({ correction }) {
  return (
    <div className="correction-view">
      {correction.map((item) => (
        <div
          key={item.answer_id}
          className={`correction-item ${item.is_correct ? 'correct' : 'incorrect'}`}
        >
          <p className="question">{item.question_label}</p>
          <p>Votre réponse : {item.selected_choice_label}</p>
          {!item.is_correct && (
            <p className="correct-answer">Bonne réponse : {item.correct_choice_label}</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default CorrectionView;
