import express from 'express';
import { userSignup } from './controllers/userSignup';
import { userLogin } from './controllers/userLogin';
import { isUserNAmeValid } from '../../middleWares/isUserNameValid';
import { verifyPassword } from '../../middleWares/verifyPAssword';
import { generateToken } from '../../middleWares/generateToken';

const router = express.Router();
router.post('/signup', isUserNAmeValid, generateToken, userSignup);
router.get('/login', verifyPassword, userLogin);

export default router;
