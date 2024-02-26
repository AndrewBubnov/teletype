import { MessageMap, UserChat } from '@/types';

export const sortChatsByLatestMessage = (chatList: UserChat[], messageMap: MessageMap) =>
	chatList.sort((chatA, chatB) => {
		const messageListA = messageMap[chatA.chatId] || [];
		const messageListB = messageMap[chatB.chatId] || [];
		if (messageListA.lastMessage && messageListB.lastMessage) {
			return (
				Date.parse(messageListB.lastMessage!.createdAt.toString()) -
				Date.parse(messageListA.lastMessage!.createdAt.toString())
			);
		}
		if (messageListA.lastMessage && !messageListB.lastMessage) return -1;
		if (messageListB.lastMessage && !messageListA.lastMessage) return 1;
		return 0;
	});
