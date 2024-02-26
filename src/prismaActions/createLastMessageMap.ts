'use server';
import { Message, MessageMap, UserChat } from '@/types';
import { prisma } from '@/db';
import { auth } from '@clerk/nextjs';

export async function createLastMessageMap(chats: UserChat[]) {
	const userId = auth().userId || '';
	const messagesArray = (await Promise.all(
		chats.map(chat => prisma.message.findMany({ where: { chatId: chat.chatId } }))
	)) as Message[][];

	return chats.reduce((acc, chat, index) => {
		if (messagesArray[index].length) {
			const currentChat = messagesArray[index];
			const unreadNumber = currentChat.filter(el => !el.isRead && !el.isHidden && el.authorId !== userId).length;
			acc[chat.chatId] = { lastMessage: currentChat.at(-1)!, unreadNumber };
		}
		return acc;
	}, {} as MessageMap);
}
