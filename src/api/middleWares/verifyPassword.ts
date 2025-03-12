import { NextFunction, Request, Response } from 'express';
import { UserService } from '../../application/services/usersService';
import { UserRepository } from '../../infrastructure/repositories/userRepository';
import { SHA256 } from 'crypto-js';
import encBase64 from 'crypto-js/enc-base64';

export const verifyPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userService = new UserService(new UserRepository());
  const { userName, password } = req.body;
  const userInDb = await userService.getUserByUserName(userName);

  if (userInDb === null) {
    res.status(400).json("Impossible de trouver ce nom d'utilisateur");
    return;
  }
  const salt = userInDb.salt;
  const hash = userInDb.hash;
  const newHash = SHA256(password + salt).toString(encBase64);
  if (hash !== newHash) {
    res.status(401).json('Le mot de passe est erroné');
    return;
  }
  req.body.userData = userInDb;
  next();
};
