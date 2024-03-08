import { useCommonStore } from '@/store';
import { Message, UnreadMessagesStore } from '@/types';

export const addMessageInStore = (state: UnreadMessagesStore, message: Message) => {
	if (!message.chatId) return { messageMap: state.messageMap };
	const { userId } = useCommonStore.getState();
	const isAuthoredByUser = message.authorId === userId;
	const unreadMessages = state.messageMap[message.chatId]?.unreadMessages || [];
	return {
		messageMap: {
			...state.messageMap,
			[message.chatId]: {
				lastMessage: message,
				unreadMessages: [...unreadMessages, ...(isAuthoredByUser ? [] : [message])],
			},
		},
	};
};
