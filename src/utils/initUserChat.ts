import { ws } from '@/ws';
import { UserChat } from '@/types';
export const initUserChat = (chats: UserChat[]) => ws.emit('init-user-chats', chats);
