import { Router } from 'express';
import { addBill, getAll, getById, update } from './controller';

const router = new Router();

router.post('/', addBill);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);

export default router;
