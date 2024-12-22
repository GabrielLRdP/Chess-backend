import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import userRoute from './routes/user';

mongoose.connect('mongodb://localhost:27017/Chess');

const app = express();
app.use(express.json());
app.use('/user', userRoute);
const port = 3000;

app.all('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
