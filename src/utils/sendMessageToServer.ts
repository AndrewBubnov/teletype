import { ws } from '@/ws';
import { Message } from '@/types';

export const sendMessageToServer = (message: Message, roomId: string) =>
	ws?.emit('message-to-server', { message, roomId });
