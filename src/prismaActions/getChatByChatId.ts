'use server';
import { prisma } from '@/db';
import { Message, User, UserChat } from '@/types';
import { getUserByUserId } from '@/prismaActions/getUserByUserId';

export const getChatByChatId = async (chatId: string): Promise<UserChat | undefined> => {
	const chat = await prisma.chat.findUnique({
		where: { chatId },
	});
	if (!chat) return;
	const members = (await Promise.all(chat.memberIds.map(id => getUserByUserId(id)))) as User[];
	const messages = (await prisma.message.findMany({ where: { chatId } })) as Message[];

	return { ...chat, members, messages };
};
