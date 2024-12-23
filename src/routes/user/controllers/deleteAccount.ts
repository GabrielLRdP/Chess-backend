import { Request, Response } from 'express';
import { UserDao } from '../userDao';

export const deleteAccount = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const userDao = new UserDao();
    await userDao.deleteAccount(userId);
    res.status(200).json('Le compte a été supprimé');
  } catch (error) {
    res.status(500).json(error);
  }
};
