'use server';
import { Message, MessagesSlice, UserChat } from '@/types';
import { prisma } from '@/db';
import { auth, useAuth } from '@clerk/nextjs';

export async function createMessagesSlice(chats: UserChat[]) {
	const userId = auth().userId;
	const messagesArray = (await Promise.all(
		chats.map(chat => prisma.message.findMany({ where: { chatId: chat.chatId } }))
	)) as Message[][];

	return chats.reduce((acc, cur, index) => {
		acc[cur.chatId] = {
			lastMessage: messagesArray[index].at(-1) || null,
			unreadNumber: messagesArray[index].reduce((unread, next) => {
				if (!next.isRead && next.authorId !== userId) unread = unread + 1;
				return unread;
			}, 0),
		};
		return acc;
	}, {} as MessagesSlice);
}
