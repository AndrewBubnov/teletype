import { Message, UpdateMessageType, UpdateUnreadInStore } from '@/types';

export const updateUnreadMessagesInStore = ({ state, updateData, type, roomId: chatId }: UpdateUnreadInStore) => {
	const { unreadMessages = [] } = state.messageMap[chatId];
	let updatedUnreadMessages: Message[];
	if (type === UpdateMessageType.DELETE) {
		const mappedUpdateData = updateData.map(el => el.id);
		updatedUnreadMessages = unreadMessages.filter(el => !mappedUpdateData.includes(el.id));
	} else {
		const updateDataMap = updateData.reduce(
			(acc, cur) => {
				acc[cur.id] = cur;
				return acc;
			},
			{} as Record<string, Message>
		);
		updatedUnreadMessages = unreadMessages.map(el => {
			if (updateDataMap[el.id]) {
				return updateDataMap[el.id];
			}
			return el;
		});
	}
	const lastMessage = updatedUnreadMessages.at(-1) || null;
	return {
		messageMap: {
			...state.messageMap,
			[chatId]: {
				lastMessage,
				unreadMessages: updatedUnreadMessages,
			},
		},
	};
};
