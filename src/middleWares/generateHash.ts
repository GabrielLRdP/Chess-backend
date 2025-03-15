import { NextFunction, Request, Response } from 'express';
import { SHA256 } from 'crypto-js';
import encBase64 from 'crypto-js/enc-base64';
import uid2 from 'uid2';

export const generateHash = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const rawPassword = req.body.password;
    const salt = uid2(16);
    const hash = SHA256(rawPassword + salt).toString(encBase64);
    req.body.hash = hash;
    req.body.salt = salt;
    next();
  } catch (error) {
    res.status(500).json(error);
  }
};
