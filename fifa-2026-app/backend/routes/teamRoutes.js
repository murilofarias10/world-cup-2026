import { Router } from 'express';
import { listTeams, getTeam } from '../controllers/teamController.js';

const router = Router();

router.get('/', listTeams);
router.get('/:name', getTeam);

export default router;
