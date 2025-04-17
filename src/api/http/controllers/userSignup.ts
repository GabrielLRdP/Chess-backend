import { Request, Response } from 'express';
import { UserService } from '../../../application/services/usersService';
import { UserRepository } from '../../../infrastructure/repositories/userRepository';
import jwt from 'jsonwebtoken';

export const userSignup = async (req: Request, res: Response) => {
  try {
    const userService = new UserService(new UserRepository());
    const { userName, salt, hash } = req.body;
    const createdUser = await userService.createUser(userName, salt, hash);
    const payload = {
      userName: userName,
      userId: createdUser.id,
    };
    const accessToken = jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_SECRET as string
    );
    res.status(200).json({
      message: 'User Created',
      userData: { userName: createdUser.userName, userId: createdUser.id },
      accessToken: accessToken,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
