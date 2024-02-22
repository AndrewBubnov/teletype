import { ws } from '@/ws';
import { ChangeVisitorStatus } from '@/types';
export const sendChangeVisitorStatus = (message: ChangeVisitorStatus) =>
	ws.emit('change-visitor-status-server', message);
