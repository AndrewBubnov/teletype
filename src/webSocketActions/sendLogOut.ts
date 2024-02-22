import { ws } from '@/ws';
export const sendLogOut = () => ws.emit('log-out');
