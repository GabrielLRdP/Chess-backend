import { Request, Response } from 'express';
import { UserDao } from '../userDao';

export const userSignup = async (req: Request, res: Response) => {
  try {
    const userDao = new UserDao();
    const { userName, salt, hash, token } = req.body;
    await userDao.createUser(userName, salt, hash, token);

    res.status(200).json({ message: 'Created User' });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
