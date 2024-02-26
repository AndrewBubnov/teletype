'use server';
import { Message, MessageMap, UserChat } from '@/types';
import { prisma } from '@/db';

export async function fetchChatMessages(chats: UserChat[]) {
	const messagesArray = (await Promise.all(
		chats.map(chat => prisma.message.findMany({ where: { chatId: chat.chatId } }))
	)) as Message[][];
	return chats.reduce((acc, chat, index) => {
		if (messagesArray[index].length) {
			acc[chat.chatId] = {
				lastMessage: messagesArray[index].at(-1)!,
				unreadNumber: messagesArray[index].filter(el => !el.isRead).length,
			};
		}
		return acc;
	}, {} as MessageMap);
}
