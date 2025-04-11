import { Server, Socket } from 'socket.io';
import { UserPayload } from '../../../../shared/types/UserPayLoad';

export const joinUsersRoom = (
  io: Server,
  socket: Socket,
  userMap: Map<string, UserPayload>
) => {
  socket.join('online-users-room');
  io.to(socket.id).emit('update-users-list', Array.from(userMap.values()));
};
