import { Request, Response } from 'express';

export const userLogin = (req: Request, res: Response) => {
  try {
    res.status(200).json({
      message: 'Success',
      userData: req.body.userData,
      accessToken: req.body.accessToken,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
