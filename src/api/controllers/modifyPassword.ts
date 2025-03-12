import { Request, Response } from 'express';
import { UserService } from '../../application/services/usersService';
import { SHA256 } from 'crypto-js';
import encBase64 from 'crypto-js/enc-base64';
import uid2 from 'uid2';
import { UserRepository } from '../../infrastructure/repositories/userRepository';

export const updatePassword = async (req: Request, res: Response) => {
  try {
    const userService = new UserService(new UserRepository());
    const userId = req.params.id;
    const newRawPassword = req.body.newPassword;
    const newSalt = uid2(16);
    const newHash = SHA256(newRawPassword + newSalt).toString(encBase64);
    await userService.updatePassword(userId, newSalt, newHash);
    res.status(200).json('Mot de passe mis à jour');
  } catch (error) {
    res.status(500).json(error);
  }
};
