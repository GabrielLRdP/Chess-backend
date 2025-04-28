import { Socket } from 'socket.io';

export const makeMove = (socket: Socket, data: any) => {
  const { roomId, previousPiecePosition, newPiecePosition } = data;
  if (!roomId) {
    console.error('Invalid make-move payload', data);
    return;
  }
  socket.to(roomId).emit('opponent-move', {
    previousPiecePosition,
    newPiecePosition,
  });
};
