import { Router } from 'express';
import { getById } from './controller';

const router = new Router();

router.get('/:id', getById);

export default router;
