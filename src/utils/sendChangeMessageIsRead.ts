import { ws } from '@/ws';
import { ChangeVisitorStatus } from '@/types';
export const sendChangeMessageIsRead = ({ messageId, chatId }: { messageId: string; chatId: string }) =>
	ws.emit('change-message-is-read', { messageId, chatId });
