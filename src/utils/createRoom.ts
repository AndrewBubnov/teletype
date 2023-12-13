import { ws } from '@/ws';

export const createRoom = (roomId: string, interlocutorId: string) =>
	ws.emit('create-room', { roomId, interlocutorId });
