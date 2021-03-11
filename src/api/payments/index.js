import { Router } from 'express';
import { getAllByUserId } from './controller';

const router = new Router();

router.get('/', getAllByUserId);

export default router;
