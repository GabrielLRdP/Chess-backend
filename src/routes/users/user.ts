import express from 'express';
import { userSignup } from './controllers/userSignup';
import { userLogin } from './controllers/userLogin';
import { isUserNameValid } from '../../middleWares/isUserNameValid';
import { verifyPassword } from '../../middleWares/verifyPassword';
import { modifyPassword } from './controllers/modifyPassword';
import { modifyUserName } from './controllers/modifyUserName';
import { verifyToken } from '../../middleWares/verifyToken';
import { generateToken } from '../../middleWares/generateToken';

const router = express.Router();
router.post('/signup', isUserNameValid, generateToken, userSignup);
router.get('/login', verifyPassword, userLogin);
router.patch('/:id/password', verifyToken, verifyPassword, modifyPassword);
router.patch('/:id/userName', verifyToken, verifyPassword, modifyUserName);

export default router;
