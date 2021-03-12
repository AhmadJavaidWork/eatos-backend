import { Router } from 'express';
import { getAll, addAmount } from './controller';

const router = new Router();

router.get('/', getAll);
router.put('/:id', addAmount);

export default router;
