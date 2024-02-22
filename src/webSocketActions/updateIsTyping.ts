import { ws } from '@/ws';
export const updateIsTyping = (fn: (isTyping: boolean) => void) => ws.on('typing-client', fn);
export const clearIsTyping = (fn: (isTyping: boolean) => void) => ws.off('typing-client', fn);
