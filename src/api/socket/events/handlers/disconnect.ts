import { Server, Socket } from 'socket.io';
import { UserPayload } from '../../../../shared/types/UserPayLoad';

export const disconnect = (
  io: Server,
  socket: Socket,
  userMap: Map<string, UserPayload>
) => {
  userMap.delete(socket.id);
  console.log(`User disconnected - ${socket.id}`);
  console.log('userMap: ', userMap);
  io.to('online-users-room').emit(
    'update-users-list',
    Array.from(userMap.values())
  );
};
