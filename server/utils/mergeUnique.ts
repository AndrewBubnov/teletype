import { UserChat } from '../../src/types';

export const mergeUnique = (chatList: UserChat[], chat: UserChat) => {
	if (chatList.map(el => el.chatId).includes(chat.chatId)) return chatList;
	return [...chatList, chat];
};
