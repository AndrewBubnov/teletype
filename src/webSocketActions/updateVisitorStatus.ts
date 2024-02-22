import { ws } from '@/ws';
import { ChatVisitorStatus } from '@/types';
export const updateVisitorStatus = (fn: (visitorStatus: ChatVisitorStatus) => void) =>
	ws.on('change-visitor-status-client', fn);

export const clearUpdateVisitorStatus = (fn: (visitorStatus: ChatVisitorStatus) => void) =>
	ws.off('change-visitor-status-client', fn);
