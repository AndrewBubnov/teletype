import { ws } from '@/ws';

export const sendDeleteUserChats = (chatIds: string[]) => ws.emit('delete-user-chats', chatIds);
