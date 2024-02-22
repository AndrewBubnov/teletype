import { ws } from '@/ws';
import { UpdateMessage } from '@/types';

export const updateClientMessage = (fn: (args: UpdateMessage) => void) => ws.on('edit-message-to-client', fn);
export const clearUpdateClientMessage = (fn: (args: UpdateMessage) => void) => ws.off('edit-message-to-client', fn);
