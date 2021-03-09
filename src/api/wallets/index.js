import { Router } from 'express';
import { token } from '../../services/passport';
import { get } from './controller';

const router = new Router();

router.get('/', token({ required: true }), get);

export default router;
