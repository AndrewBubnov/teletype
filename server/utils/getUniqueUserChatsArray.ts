import { UserChat } from '../../src/types';

export const getUniqueUserChatsArray = (socketUserChatsMapValue: UserChat[], chats: UserChat[]) => {
	const uniqueIdsList = Array.from(
		new Set([...socketUserChatsMapValue.map(el => el.chatId).filter(Boolean), ...chats.map(el => el.chatId)])
	);
	const mergeMap = [...socketUserChatsMapValue, ...chats].reduce(
		(acc, cur) => {
			acc[cur.chatId] = cur;
			return acc;
		},
		{} as Record<string, UserChat>
	);
	return uniqueIdsList.map(el => mergeMap[el]);
};
