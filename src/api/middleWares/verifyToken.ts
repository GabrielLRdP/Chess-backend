import { NextFunction, Request, Response } from 'express';
import { UserService } from '../../application/services/usersService';
import { UserRepository } from '../../infrastructure/repositories/userRepository';

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userService = new UserService(new UserRepository());
  const userId = req.params.id;
  const userToken = req.headers['authorization']?.split(' ')[1];
  const dbToken = await userService.getTokenByUserId(userId);

  if (!userToken) {
    res.status(401).json(`Not authenticated`);
    return;
  }

  if (!dbToken) {
    res.status(401).json(`Wrong id`);
    return;
  }

  console.log('dbToken', dbToken);
  console.log('userToken', userToken);

  if (dbToken !== userToken) {
    res.status(401).json(`Unauthorized token`);
    return;
  }

  next();
};
