import { Router } from 'express';
import { token } from '../services/passport';
import admin from './admin';
import user from './user';
import auth from './auth';
import wallets from './wallets';
import userBills from './userBills';
import bills from './bills';
import payments from './payments';

const router = new Router();

router.use('/admin', token({ required: true, roles: ['admin'] }), admin);
router.use('/users', user);
router.use('/auth', auth);
router.use('/wallets', wallets);
router.use('/user-bills', token({ required: true }), userBills);
router.use('/bills', token({ required: true }), bills);
router.use('/payments', token({ required: true }), payments);

export default router;
