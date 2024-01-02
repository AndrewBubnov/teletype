'use server';
import { prisma } from '@/db';
import { MessageType, User, UserChat } from '@/types';
import { getUserByUserId } from '@/actions/getUserByUserId';

export const getUserChats = async (chatIdsArray: string[]): Promise<UserChat[]> => {
	const chats = await prisma.chat.findMany({
		where: { chatId: { in: chatIdsArray } },
	});

	const chatMemberIdsArray = chats.map(chat => chat.memberIds);
	const connectedUsers = (await Promise.all(
		chatMemberIdsArray.map(async idsArray => Promise.all(idsArray.map(id => getUserByUserId(id))))
	)) as User[][];

	return chats.map((chat, index) => ({
		...chat,
		members: connectedUsers[index],
	}));
};
