import { Socket, Server } from 'socket.io';
import { UserPayload } from '../../../shared/types/UserPayLoad';

export const respondToInvitation = (
  io: Server,
  socket: Socket,
  userMap: Map<string, UserPayload>,
  data: InvitationResponse
) => {
  const sender = userMap.get(socket.id);
  const targetSocketId = [...userMap.entries()].find(
    ([, value]) => value.userId === data.fromUserId
  )?.[0];

  if (!targetSocketId) return;

  io.to(targetSocketId).emit('invitation-response', {
    from: { userName: sender?.userName, userId: sender?.userId },
    accepted: data.accepted,
  });
};

type InvitationResponse = {
  fromUserId: string;
  accepted: boolean;
};
