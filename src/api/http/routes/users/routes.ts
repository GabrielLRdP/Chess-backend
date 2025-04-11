import express from 'express';
import { userSignup } from '../../controllers/userSignup';
import { userLogin } from '../../controllers/userLogin';
import { isUserNameValid } from '../../../../middleWares/isUserNameValid';
import { verifyPassword } from '../../../../middleWares/verifyPassword';
import { updatePassword } from '../../controllers/modifyPassword';
import { modifyUserName } from '../../controllers/modifyUserName';
import { deleteAccount } from '../../controllers/deleteAccount';
import { authenticateToken } from '../../../../middleWares/authenticateToken';
import { generateHash } from '../../../../middleWares/generateHash';
import { generateToken } from '../../../../middleWares/generateToken';

const router = express.Router();
router.post('/signup', isUserNameValid, generateHash, userSignup);
router.post('/login', verifyPassword, generateToken, userLogin);
router.patch('/:id/password', authenticateToken, updatePassword);
router.patch(
  '/:id/userName',
  authenticateToken,
  isUserNameValid,
  modifyUserName
);
router.delete('/:id', authenticateToken, deleteAccount);

export default router;
