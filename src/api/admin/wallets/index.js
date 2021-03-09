import { Router } from 'express';
import { getAll, update } from './controller';

const router = new Router();

router.get('/', getAll);
router.put('/:id', update);

export default router;
