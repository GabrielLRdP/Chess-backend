import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';
import jwt from 'jsonwebtoken';

const userMap = new Map();
export const initSocket = (server: HttpServer) => {
  const io = new Server(server, {
    cors: { origin: '*' },
  });

  io.on('connection', (socket) => {
    const token = socket.handshake.auth?.token;
    const decoded = jwt.decode(token) as UserPayload;
    console.log(token);
    console.log(decoded);
    console.log(userMap);
    const socketId = socket.id;
    console.log(`User connected - ${socketId}`);
    socket.on('disconnect', (socket) => {
      console.log(`User disconnected - ${socketId}`);
    });
  });

  console.log('Socket.io initialized');
};

type UserPayload = { userId: string; iat: number; userName: string };
