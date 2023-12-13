import { ws } from '@/ws';
export const updateActiveUsers = (fn: (activeUsersList: string[]) => void) => ws.on('active-users', fn);
