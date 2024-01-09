import { ws } from '@/ws';
import { MessageDraft } from '@/types';

export const sendMessageToServer = (message: MessageDraft, roomId: string) =>
	ws?.emit('message-to-server', { message, roomId });
