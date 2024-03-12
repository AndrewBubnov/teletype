import { ws } from '@/ws';
import { UpdateIsRead } from '@/types';

export const sendUpdateIsRead = (args: UpdateIsRead) => ws.emit('update-is-read-to-server', args);
