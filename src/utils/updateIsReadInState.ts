import { Message, UnreadMessagesStore } from '@/types';

export const updateIsReadInState = (state: UnreadMessagesStore, message: Message) => {
	const { unreadMessages = [], lastMessage } = state.messageMap[message.chatId];
	return {
		messageMap: {
			...state.messageMap,
			[message.chatId]: {
				lastMessage,
				unreadMessages: unreadMessages.filter(el => el.id !== message.id),
			},
		},
	};
};
