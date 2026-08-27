import {pool} from '../config/database';
import { Answer, AnswerSubmitInput, AnswerCorrection } from '../Model/Answer';

// NB : suppose une table `answers` (id, attempt_id, question_id, choice_id, is_correct)
// et réutilise les tables `questions` / `choices` gérées par le Membre 2.

export class AnswerRepository {
  async createMany(attemptId: number, answers: AnswerSubmitInput[]): Promise<Answer[]> {
    const inserted: Answer[] = [];
    for (const a of answers) {
      const result = await pool.query<Answer>(
        `INSERT INTO answers (attempt_id, question_id, choice_id)
         VALUES ($1, $2, $3)
         RETURNING *`,
        [attemptId, a.question_id, a.choice_id]
      );
      inserted.push(result.rows[0]);
    }
    return inserted;
  }

  async findByAttempt(attemptId: number): Promise<Answer[]> {
    const result = await pool.query<Answer>(
      `SELECT * FROM answers WHERE attempt_id = $1`,
      [attemptId]
    );
    return result.rows;
  }

  async markCorrectness(answerId: number, isCorrect: boolean): Promise<void> {
    await pool.query(`UPDATE answers SET is_correct = $2 WHERE id = $1`, [answerId, isCorrect]);
  }

  // RG-12 : correction détaillée (question + choix sélectionné + bonne réponse) pour une tentative
  async findCorrectionByAttempt(attemptId: number): Promise<AnswerCorrection[]> {
    const result = await pool.query<AnswerCorrection>(
      `SELECT
         a.id AS answer_id,
         q.id AS question_id,
         q.label AS question_label,
         a.choice_id AS selected_choice_id,
         sc.label AS selected_choice_label,
         cc.id AS correct_choice_id,
         cc.label AS correct_choice_label,
         (a.choice_id = cc.id) AS is_correct
       FROM answers a
       JOIN questions q ON q.id = a.question_id
       JOIN choices sc ON sc.id = a.choice_id
       JOIN choices cc ON cc.question_id = q.id AND cc.is_correct = true
       WHERE a.attempt_id = $1
       ORDER BY q.id`,
      [attemptId]
    );
    return result.rows;
  }
}

export default new AnswerRepository();
