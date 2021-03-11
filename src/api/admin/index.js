import { Router } from 'express';
import { token } from '../../services/passport';
import users from './users';
import wallets from './wallets';
import bills from './bills';
import payments from './payments';

const router = new Router();

router.use('/users', token({ required: true, roles: ['admin'] }), users);
router.use('/wallets', token({ required: true, roles: ['admin'] }), wallets);
router.use('/bills', token({ required: true, roles: ['admin'] }), bills);
router.use('/payments', token({ required: true, roles: ['admin'] }), payments);

export default router;
