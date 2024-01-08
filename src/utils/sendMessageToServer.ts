import { ws } from '@/ws';
import { Message, MessageDraft } from '@/types';

export const sendMessageToServer = (message: MessageDraft, roomId: string) =>
	ws?.emit('message-to-server', { message, roomId });
