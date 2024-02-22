import { ws } from '@/ws';
export const updateConnectionError = (fn: (error: Error) => void) => ws.on('connect_error', fn);
export const clearUpdateConnectionError = (fn: (error: Error) => void) => ws.off('connect_error', fn);
