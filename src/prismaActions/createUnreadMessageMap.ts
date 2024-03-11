'use server';
import { prisma } from '@/db';
import { auth } from '@clerk/nextjs';
import { Message, UnreadMessageMap, UserChat } from '@/types';

export async function createUnreadMessageMap(chats: UserChat[]) {
	const userId = auth().userId || '';
	const messagesArray = (await Promise.all(
		chats.map(chat => prisma.message.findMany({ where: { chatId: chat.chatId } }))
	)) as Message[][];

	return chats.reduce((acc, chat, index) => {
		if (messagesArray[index].length) {
			const currentChat = messagesArray[index].filter(el => el.isHidden !== userId) || [];
			const unreadNumber = currentChat.filter(el => !el.isRead && el.authorId !== userId).length;
			acc[chat.chatId] = { lastMessage: currentChat.at(-1) || null, unreadNumber };
		}
		return acc;
	}, {} as UnreadMessageMap);
}
