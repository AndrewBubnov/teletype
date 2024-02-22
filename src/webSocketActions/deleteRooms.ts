import { ws } from '@/ws';

export const deleteRooms = (roomIds: string[]) => ws.emit('delete-rooms', roomIds);
