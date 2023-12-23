import { ws } from '@/ws';
export const updateActiveUsers = (fn: (activeUsersList: string[]) => void) => ws.on('active-users', fn);
export const clearActiveUsers = (fn: (activeUsersList: string[]) => void) => ws.off('active-users', fn);
