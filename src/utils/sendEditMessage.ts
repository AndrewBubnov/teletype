import { ws } from '@/ws';
import { EditMessageClient } from '@/types';

export const sendEditMessage = ({ messageId, message, roomId }: EditMessageClient) =>
	ws.emit('edit-message-to-server', { messageId, message, roomId });
