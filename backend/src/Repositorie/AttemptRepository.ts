import {pool} from '../config/database';
import { Attempt, AttemptCreateInput } from '../Model/Attempt';



export class AttemptRepository {
  async findByStudentAndExam(studentId: number, examId: number): Promise<Attempt | null> {
    const result = await pool.query<Attempt>(
      `SELECT * FROM attempts WHERE student_id = $1 AND exam_id = $2`,
      [studentId, examId]
    );
    return result.rows[0] ?? null;
  }

  async create(data: AttemptCreateInput): Promise<Attempt> {
    const result = await pool.query<Attempt>(
      `INSERT INTO attempts (student_id, exam_id, started_at, status)
       VALUES ($1, $2, NOW(), 'in_progress')
       RETURNING *`,
      [data.student_id, data.exam_id]
    );
    return result.rows[0];
  }

  async findById(id: number): Promise<Attempt | null> {
    const result = await pool.query<Attempt>(`SELECT * FROM attempts WHERE id = $1`, [id]);
    return result.rows[0] ?? null;
  }

  //la note est ecrite ici  apres calcul
  async markSubmitted(id: number, score: number): Promise<Attempt> {
    const result = await pool.query<Attempt>(
      `UPDATE attempts
       SET submitted_at = NOW(), score = $2, status = 'submitted'
       WHERE id = $1
       RETURNING *`,
      [id, score]
    );
    return result.rows[0];
  }

  async findAllByStudent(studentId: number): Promise<Attempt[]> {
    const result = await pool.query<Attempt>(
      `SELECT * FROM attempts WHERE student_id = $1 ORDER BY started_at DESC`,
      [studentId]
    );
    return result.rows;
  }

  // dashboard / resultats admin d'un examen
  async findAllByExam(examId: number): Promise<Attempt[]> {
    const result = await pool.query<Attempt>(
      `SELECT * FROM attempts WHERE exam_id = $1 ORDER BY score DESC NULLS LAST`,
      [examId]
    );
    return result.rows;
  }
}

export default new AttemptRepository();
