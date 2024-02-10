import { MessageMap, UserChat } from '@/types';

export const sortChatsByLatestMessage = (chatList: UserChat[], messageMap: MessageMap) =>
	chatList.sort((chatA, chatB) => {
		const messageListA = messageMap[chatA.chatId] || [];
		const messageListB = messageMap[chatB.chatId] || [];
		if (messageListA.at(-1) && messageListB.at(-1)) {
			return (
				Date.parse(messageListB.at(-1)!.createdAt.toString()) -
				Date.parse(messageListA.at(-1)!.createdAt.toString())
			);
		}
		if (messageListA.at(-1) && !messageListB.at(-1)) return -1;
		if (messageListB.at(-1) && !messageListA.at(-1)) return 1;
		return 0;
	});
