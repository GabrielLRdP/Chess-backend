import { NextFunction, Request, Response } from 'express';
import { User } from '../domain/entities/User';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { access } from 'fs';

export const generateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const payload = { userName: req.body.userName, userId: req.body.userId };
    const accessToken = jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_SECRET as string
    );
    console.log(accessToken);
    req.body.accessToken = accessToken;
    next();
  } catch (error) {
    res.status(500).json(error);
  }
};
