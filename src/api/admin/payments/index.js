import { Router } from 'express';
import { getAll } from './controller';

const router = new Router();

router.get('/', getAll);

export default router;
