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
    const socketId = socket.id;
    console.log(`user connected - ${socketId} \n user infos :${decoded}`);
    userMap.set(socketId, decoded);
    console.log('userMap: ', userMap);

    io.to('online-users-room').emit(
      'update-users-list',
      Array.from(userMap.values())
    );
    socket.on('join-users-room', (userData) => {
      socket.join('online-users-room');
      console.log('room joined AAAAAAAA');
      io.to(socket.id).emit('update-users-list', Array.from(userMap.values()));
    });

    socket.on('leave-users-room', () => {
      socket.leave('online-usesr-room');
    });

    socket.on('disconnect', (socket) => {
      userMap.delete(socketId);
      console.log(`User disconnected - ${socketId}`);
      console.log('userMap: ', userMap);
      io.to('online-users-room').emit(
        'update-users-list',
        Array.from(userMap.values())
      );
    });
  });

  console.log('Socket.io initialized');
};

type UserPayload = { userId: string; iat: number; userName: string };
