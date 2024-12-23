import { Request, Response } from 'express';
import { UserDao } from '../userDao';

export const modifyUserName = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const userDao = new UserDao();
    const newUserName = req.body.newUserName;
    await userDao.updateUserName(userId, newUserName);
    res.status(200).json('Pseudo mis à jour');
  } catch (error) {
    res.status(500).json(error);
  }
};
