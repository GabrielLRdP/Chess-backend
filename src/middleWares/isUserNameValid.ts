import { NextFunction, Request, Response } from 'express';
import { UserDao } from '../routes/user/userDao';

export const isUserNameValid = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userName } = req.body;
  const userDao = new UserDao();
  const userIndDb = await userDao.getByUserName(userName);
  if (userIndDb) {
    res.status(409).json({ message: "Ce nom d'utilisateur est déjà utilisé" });
    return;
  }
  next();
};
