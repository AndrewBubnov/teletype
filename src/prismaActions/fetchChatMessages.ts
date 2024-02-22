'use server';
import { Message, UserChat } from '@/types';
import { prisma } from '@/db';

export async function fetchChatMessages(chats: UserChat[]) {
	const messagesArray = (await Promise.all(
		chats.map(chat => prisma.message.findMany({ where: { chatId: chat.chatId } }))
	)) as Message[][];
	return chats.reduce(
		(acc, chat, index) => {
			acc[chat.chatId] = messagesArray[index];
			return acc;
		},
		{} as Record<string, Message[]>
	);
}
