import { ws } from '@/ws';
import { UpdateMessage } from '@/types';

export const sendEditMessage = (args: UpdateMessage) => ws.emit('edit-message-to-server', args);
