import { ws } from '@/ws';
export const sendChangeMessageIsRead = (messageId: string) => ws.emit('change-message-is-read', messageId);
