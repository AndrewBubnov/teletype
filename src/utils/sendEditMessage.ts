import { ws } from '@/ws';
import { EditMessageServer, Message } from '@/types';

export const sendEditMessage = ({ messageId, message, roomId }: EditMessageServer) =>
	ws?.emit('edit-message-to-server', { messageId, message, roomId });
