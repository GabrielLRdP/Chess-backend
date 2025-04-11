import { Server, Socket } from 'socket.io';
import { UserPayload } from '../../../../shared/types/UserPayLoad';

export const leaveUsersRoom = (
  io: Server,
  socket: Socket,
  userMap: Map<string, UserPayload>
) => {
  socket.leave('online-users-room');
  io.to(socket.id).emit('update-users-list', Array.from(userMap.values()));
};
