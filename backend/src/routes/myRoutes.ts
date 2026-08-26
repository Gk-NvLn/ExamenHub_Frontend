import { Router } from 'express';
import myController from '../Controller/MyController';
import { authMiddleware } from '../Security/authMiddleware';
import { roleMiddleware } from '../Security/roleMiddleware';

const router = Router();

// Toutes les routes /api/my/* nécessitent d'être authentifié en tant qu'étudiant
router.use(authMiddleware, roleMiddleware(['student']));

router.get('/exams', myController.getAvailableExams);
router.get('/exams/:id', myController.startExam);
router.post('/exams/:id/submit', myController.submitExam);
router.get('/results', myController.getMyResults);
router.get('/results/:id', myController.getResultDetail);

export default router;

// Dans app.ts (socle commun) : app.use('/api/my', myRoutes);
