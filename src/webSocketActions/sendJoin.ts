import { ws } from '@/ws';

export const sendJoin = (userId: string) => ws.emit('join', userId);
