import { ws } from '@/ws';
import { UserChat } from '@/types';
export const updateChatList = (fn: (list: UserChat[]) => void) => ws.on('update-chat-list', fn);
export const clearUpdateChatList = (fn: (list: UserChat[]) => void) => ws.off('update-chat-list', fn);
