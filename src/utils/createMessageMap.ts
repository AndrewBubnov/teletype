import { ws } from '@/ws';
import { MessageMap } from '@/types';
export const createMessageMap = (fn: (messageMap: MessageMap) => void) => ws.on('get-room-messages-client', fn);
export const clearMessageMap = (fn: (messageMap: MessageMap) => void) => ws.off('get-room-messages-client', fn);
