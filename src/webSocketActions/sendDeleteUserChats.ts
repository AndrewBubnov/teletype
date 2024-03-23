import { ws } from '@/ws';

export const sendDeleteUserChats = (ids: string[], chatIds: string[]) => ws.emit('delete-user-chats', ids, chatIds);
