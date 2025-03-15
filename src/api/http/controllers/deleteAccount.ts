import { Request, Response } from 'express';
import { UserService } from '../../../application/services/usersService';
import { UserRepository } from '../../../infrastructure/repositories/userRepository';

export const deleteAccount = async (req: Request, res: Response) => {
  try {
    const userService = new UserService(new UserRepository());
    const userId = req.params.id;
    await userService.deleteAccount(userId);
    res.status(200).json('Account deleted');
  } catch (error) {
    res.status(500).json(error);
  }
};
