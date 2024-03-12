import { ws } from '@/ws';
import { UpdateIsRead } from '@/types';

export const updateIsReadListener = (fn: (args: UpdateIsRead) => void) => ws.on('update-is-read-to-client', fn);
export const clearUpdateIsReadListener = (fn: (args: UpdateIsRead) => void) => ws.off('update-is-read-to-client', fn);
