import { Server, Socket } from 'socket.io';
import jwt from 'jsonwebtoken';
import { UserPayload } from '../../../shared/types/UserPayLoad';
import { joinUsersRoom } from './handlers/joinUsersRoom';
import { leaveUsersRoom } from './handlers/leaveUsersRoom';
import { sendInvitation } from '../controllers/sendInvitation';
import { respondToInvitation } from '../controllers/respondToInvitation';
import { disconnect } from './handlers/disconnect';

const userMap = new Map();

export const onConnection = (io: Server, socket: Socket) => {
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
  socket.on('join-users-room', () => joinUsersRoom(io, socket, userMap));

  socket.on('leave-users-room', () => {
    leaveUsersRoom(io, socket, userMap);
  });

  socket.on('send-invitation', (targetUserId) => {
    sendInvitation(io, socket, userMap, targetUserId);
  });

  socket.on('respond-invitation', (data) => {
    respondToInvitation(io, socket, userMap, data);
  });

  socket.on('disconnect', () => {
    disconnect(io, socket, userMap);
  });
};
