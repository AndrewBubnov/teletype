import { ws } from '@/ws';
import { Message } from '@/types';
export const addClientMessage = (fn: (message: Message) => void) => ws.on('message-to-client', fn);
export const clearAddClientMessage = (fn: (message: Message) => void) => ws.off('message-to-client', fn);
