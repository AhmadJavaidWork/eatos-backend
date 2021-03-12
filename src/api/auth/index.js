import { Router } from 'express';
import { signIn, signOut } from './controller';
import { password, master, token } from '../../services/passport';

const router = new Router();

router.post('/sign-in', master(), password(), signIn);
router.get('/sign-out', token({ required: true }), signOut);

export default router;
