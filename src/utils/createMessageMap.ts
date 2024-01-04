import { ws } from '@/ws';
import { MessageMap } from '@/types';
export const createMessageMap = (fn: (messageMap: MessageMap) => void) => ws.on('get-messages-map', fn);
export const clearMessageMap = (fn: (messageMap: MessageMap) => void) => ws.off('get-messages-map', fn);
