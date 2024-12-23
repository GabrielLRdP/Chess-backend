import { NextFunction, Request, Response } from 'express';
import { UserDao } from '../routes/users/userDao';

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userDao = new UserDao();
  const userId = req.params.id;
  const userToken = req.headers['authorization']?.split(' ')[1];
  const dbToken = await userDao.getTokenById(userId);

  if (!userToken) {
    res.status(401).json(`Vous devez vous authentifier`);
    return;
  }

  if (!dbToken) {
    res.status(401).json(`Mauvais Id fournit`);
    return;
  }

  console.log('dbToken', dbToken);
  console.log('userToken', userToken);

  if (dbToken !== userToken) {
    res.status(401).json(`Le token n'est pas valide`);
    return;
  }

  next();
};
