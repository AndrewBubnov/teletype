import { ws } from '@/ws';
import { UserChat } from '@/types';
export const addUserChat = (chat: UserChat) => ws.emit('add-user-chat', chat);
