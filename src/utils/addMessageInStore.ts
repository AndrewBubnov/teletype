import { Message, UnreadMessagesStore } from '@/types';
import { useCommonStore } from '@/store';

export const addMessageInStore = (state: UnreadMessagesStore, message: Message) => {
	if (!message.chatId) return { messageMap: state.messageMap };
	const { userId } = useCommonStore.getState();
	const unreadNumber = state.messageMap[message.chatId]?.unreadNumber || 0;
	const diff = message.isRead || message.authorId === userId ? 0 : 1;
	return {
		messageMap: {
			...state.messageMap,
			[message.chatId]: {
				lastMessage: message,
				unreadNumber: unreadNumber + diff,
			},
		},
	};
};
