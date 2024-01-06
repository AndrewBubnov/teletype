import { ws } from '@/ws';
export const sendPing = () => ws.emit('ping');
