import { ws } from '@/ws';
import { ChangeVisitorStatus, SendAddReactionArgs } from '@/types';

export const sendAddReaction = ({ chatId, messageId, reaction, authorImageUrl }: SendAddReactionArgs) =>
	ws.emit('add-reaction', { chatId, messageId, reaction, authorImageUrl });
