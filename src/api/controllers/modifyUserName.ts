import { Request, Response } from 'express';
import { UserService } from '../../application/services/usersService';
import { UserRepository } from '../../infrastructure/repositories/userRepository';

export const modifyUserName = async (req: Request, res: Response) => {
  try {
    const userService = new UserService(new UserRepository());
    const userId = req.params.id;
    const newUserName = req.body.userName;
    await userService.updateUserName(userId, newUserName);
    res.status(200).json('UpdatedUserName');
  } catch (error) {
    res.status(500).json(error);
  }
};
