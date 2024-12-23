import { Request, Response } from 'express';
import { UserDao } from '../userDao';
import { SHA256 } from 'crypto-js';
import encBase64 from 'crypto-js/enc-base64';
import uid2 from 'uid2';

export const modifyPassword = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const userDao = new UserDao();
    const newRawPassword = req.body.newPassword;
    const newSalt = uid2(16);
    const newHash = SHA256(newRawPassword + newSalt).toString(encBase64);
    await userDao.updatePassword(userId, newSalt, newHash);
    res.status(200).json('Mot de passe mis à jour');
  } catch (error) {
    res.status(500).json(error);
  }
};
