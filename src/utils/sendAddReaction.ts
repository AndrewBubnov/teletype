import { ws } from '@/ws';
import { SendAddReactionArgs } from '@/types';

export const sendAddReaction = ({ chatId, messageId, message }: SendAddReactionArgs) =>
	ws.emit('add-reaction', { chatId, messageId, message });
