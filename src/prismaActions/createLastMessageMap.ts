'use server';
import { Message, UnreadMessageMap, UserChat } from '@/types';
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
			const ids = currentChat.filter(el => !el.isRead && !el.isHidden && el.authorId !== userId).map(el => el.id);
			acc[chat.chatId] = { lastMessage: currentChat.at(-1)!, ids };
		}
		return acc;
	}, {} as UnreadMessageMap);
}
