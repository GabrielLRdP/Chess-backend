import express, { Request, Response } from 'express';

const router = express.Router();

router.post('/', (req: Request, res: Response) => {
  res.json({ message: 'Create User' });
});

export default router;
