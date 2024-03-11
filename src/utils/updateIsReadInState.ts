import { UnreadMessagesStore } from '@/types';

export const updateIsReadInState = (state: UnreadMessagesStore, chatId: string) => {
	const { unreadNumber = 0, lastMessage } = state.messageMap[chatId];
	return {
		messageMap: {
			...state.messageMap,
			[chatId]: {
				lastMessage,
				unreadNumber: unreadNumber - 1,
			},
		},
	};
};
