import { Router } from 'express';
import { listMatches, getMatch } from '../controllers/matchController.js';

const router = Router();

router.get('/', listMatches);
router.get('/:matchNumber', getMatch);

export default router;
