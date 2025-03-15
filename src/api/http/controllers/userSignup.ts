import { Request, Response } from 'express';
import { UserService } from '../../../application/services/usersService';
import { UserRepository } from '../../../infrastructure/repositories/userRepository';
export const userSignup = async (req: Request, res: Response) => {
  try {
    const userService = new UserService(new UserRepository());
    const { userName, salt, hash } = req.body;
    const createdUser = await userService.createUser(userName, salt, hash);
    res
      .status(200)
      .json({
        message: 'User Created ',
        user: createdUser,
        accessToken: req.body.accessToken,
      });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
