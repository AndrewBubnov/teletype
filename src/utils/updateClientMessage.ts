import { ws } from '@/ws';
import { EditMessageClient } from '@/types';
export const updateClientMessage = (fn: ({ message, messageId }: EditMessageClient) => void) =>
	ws.on('edit-message-to-client', fn);
export const clearUpdateClientMessage = (fn: ({ message, messageId }: EditMessageClient) => void) =>
	ws.off('edit-message-to-client', fn);
