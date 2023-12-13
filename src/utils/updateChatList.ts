import { ws } from '@/ws';
import { UserChat } from '@/types';
export const updateChatList = (fn: (list: UserChat[]) => void) => ws.on('update-chat-list', fn);
