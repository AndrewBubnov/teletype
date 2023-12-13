import { GetInterlocutorState, VisitorStatus } from '@/types';

export const getInterlocutorState = ({
	chatVisitorStatus,
	chatId,
	interlocutorId,
	activeUsers,
}: GetInterlocutorState) => {
	const status = chatVisitorStatus[chatId]?.[interlocutorId]?.status;
	const date = chatVisitorStatus[chatId]?.[interlocutorId]?.date;
	if (!status || !date) return;
	if (!status || !activeUsers.includes(interlocutorId))
		return {
			status: VisitorStatus.OUT,
			text: 'Offline',
			data: date,
			color: 'tomato',
		};
	if (status === VisitorStatus.OUT)
		return {
			status,
			text: 'Online, not in the chat',
			data: date,
			color: 'yellow',
		};
	return {
		status,
		text: 'Online, in the chat',
		data: null,
		color: 'lightgreen',
	};
};
