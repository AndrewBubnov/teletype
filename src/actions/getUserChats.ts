'use server';
import { prisma } from '@/db';
import { MessageType, User, UserChat } from '@/types';
import { getUserByUserId } from '@/actions/getUserByUserId';

export const getUserChats = async (chatIdsArray: string[]): Promise<UserChat[]> => {
	const chats = await prisma.chat.findMany({
		where: { chatId: { in: chatIdsArray } },
	});
	const messages = await prisma.chat.findMany({
		where: { chatId: { in: chatIdsArray } },
		select: { messageIds: true },
	});
	const messagesArray = await Promise.all(
		messages.map(async el => {
			const ids = el.messageIds ?? [];
			return prisma.message.findMany({
				where: { id: { in: ids } },
			});
		})
	);

	const chatMemberIdsArray = chats.map(chat => chat.memberIds);
	const connectedUsers = (await Promise.all(
		chatMemberIdsArray.map(async idsArray => Promise.all(idsArray.map(id => getUserByUserId(id))))
	)) as User[][];

	return chats.map((chat, index) => ({
		...chat,
		messages: messagesArray[index].map(message => ({
			...message,
			type: message.type as MessageType,
			text: message.text,
			imageUrl: message.imageUrl,
			isRead: false,
		})),
		members: connectedUsers[index],
	}));
};
