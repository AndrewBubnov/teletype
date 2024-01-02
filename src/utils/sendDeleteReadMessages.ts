import { ws } from '@/ws';
import { ChangeVisitorStatus } from '@/types';
export const sendDeleteReadMessages = (chatId: string) => ws.emit('delete-read-messages', chatId);
