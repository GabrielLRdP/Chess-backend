import express from 'express';
import mongoose from 'mongoose';
import usersRoute from './api/http/routes/users/routes';
import cors from 'cors';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { initSocket } from './infrastructure/socket/socketServer';

mongoose.connect('mongodb://localhost:27017/Chess');

const port = 3000;
const app = express();

const httpServer = createServer(app);

app.use(cors());
app.use(express.json());
app.use('/users', usersRoute);
app.all('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

initSocket(httpServer);

httpServer.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
