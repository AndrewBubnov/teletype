'use server';
import { prisma } from '@/db';
import { Message, User, UserChat } from '@/types';
import { getUserByUserId } from '@/actions/getUserByUserId';

export const getChatByChatId = async (chatId: string): Promise<UserChat | undefined> => {
	const chat = await prisma.chat.findUnique({
		where: { chatId },
	});
	if (!chat) return;
	const members = (await Promise.all(chat.memberIds.map(id => getUserByUserId(id)))) as User[];

	return { ...chat, members };
};
