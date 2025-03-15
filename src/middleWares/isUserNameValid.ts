import { NextFunction, Request, Response } from 'express';
import { UserService } from '../application/services/usersService';
import { UserRepository } from '../infrastructure/repositories/userRepository';

export const isUserNameValid = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userService = new UserService(new UserRepository());
  const { userName } = req.body;
  const userIndDb = await userService.getUserByUserName(userName);
  if (userIndDb) {
    res.status(409).json({ message: 'This userName already exist' });
    return;
  }
  next();
};
