'use server';
import { prisma } from '@/db';
import { MessageType, User, UserChat } from '@/types';
import { getUserByUserId } from '@/actions/getUserByUserId';

export const getUserChats = async (chatIdsArray: string[]): Promise<UserChat[]> => {
	const result = await prisma.chat.findMany({
		where: { chatId: { in: chatIdsArray } },
		include: {
			messages: true,
		},
	});
	const chatMemberIdsArray = result.map(chat => chat.memberIds);
	const connectedUsers = (await Promise.all(
		chatMemberIdsArray.map(async idsArray => Promise.all(idsArray.map(id => getUserByUserId(id))))
	)) as User[][];

	return result.map((chat, index) => ({
		...chat,
		messages: chat.messages.map(message => ({
			...message,
			type: message.type as MessageType,
			text: message.text,
			imageUrl: message.imageUrl,
			isRead: false,
		})),
		members: connectedUsers[index],
	}));
};
