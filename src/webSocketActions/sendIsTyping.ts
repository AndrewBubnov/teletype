import { ws } from '@/ws';

export const sendIsTyping = (interlocutorId: string, isTyping: boolean) =>
	ws.emit('typing-server', interlocutorId, isTyping);
