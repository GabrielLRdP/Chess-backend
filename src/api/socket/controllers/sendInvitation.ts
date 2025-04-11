import { Socket, Server } from 'socket.io';
import { UserPayload } from '../../../shared/types/UserPayLoad';

export const sendInvitation = (
  io: Server,
  socket: Socket,
  userMap: Map<string, UserPayload>,
  targetUserId: string
) => {
  const sender = userMap.get(socket.id);
  const targetSocketId = [...userMap.entries()].find(
    ([, value]) => value.userId === targetUserId
  )?.[0];
  if (!targetSocketId) return;

  io.to(targetSocketId).emit('receive-invitation', {
    fromUserId: sender?.userId,
    fromUserName: sender?.userName,
  });
};
