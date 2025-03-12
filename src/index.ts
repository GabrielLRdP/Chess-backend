import express from 'express';
import mongoose from 'mongoose';
import usersRoute from './api/routes/users/routes';
import cors from 'cors';
mongoose.connect('mongodb://localhost:27017/Chess');

const port = 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use('/users', usersRoute);
app.all('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
