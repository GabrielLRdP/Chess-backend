import { Socket, Server } from 'socket.io';
import { UserPayload } from '../../../shared/types/UserPayLoad';

export const respondToInvitation = (
  io: Server,
  socket: Socket,
  userMap: Map<string, UserPayload>,
  data: InvitationResponse
) => {
  const sender = userMap.get(socket.id);
  const targetSocketId = data.opponentSocketId;
  const receiver = userMap.get(targetSocketId);

  if (!targetSocketId) return;

  io.to(targetSocketId).emit('invitation-response', {
    from: { userName: sender?.userName, userId: sender?.userId },
    accepted: data.accepted,
  });

  if (data.accepted && sender && receiver) {
    const roomId = `game-${[sender.userId, receiver.userId].sort().join('-')}`;
    const randomColor = Math.random() > 0.5 ? 'white' : 'black';
    socket.join(roomId);
    io.sockets.sockets.get(targetSocketId)?.join(roomId);
    io.to(roomId).emit('game-started', {
      roomId,
      players: [
        {
          userId: sender.userId,
          userName: sender.userName,
          color: randomColor,
        },
        {
          userId: receiver.userId,
          userName: receiver.userName,
          color: randomColor === 'white' ? 'black' : 'white',
        },
      ],
    });
  }
};

type InvitationResponse = {
  opponentSocketId: string;
  accepted: boolean;
};
