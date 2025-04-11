import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';
import { onConnection } from '../../api/socket/events/onConnection';

export const initSocket = (server: HttpServer) => {
  const io = new Server(server, {
    cors: { origin: '*' },
  });

  io.on('connection', (socket) => onConnection(io, socket));

  console.log('Socket.io initialized');
};
