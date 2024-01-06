import { ws } from '@/ws';
import { UserChat } from '@/types';
export const initUserChats = (chats: UserChat[]) => ws.emit('init-user-chats', chats);
