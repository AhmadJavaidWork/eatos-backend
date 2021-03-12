import { Router } from 'express';
import { getByUserBillId } from './controller';

const router = new Router();

router.get('/:id', getByUserBillId);

export default router;
