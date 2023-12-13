'use server';
import { prisma } from '@/db';
import { Chat, Message, User, UserChat } from '@/types';
import { getUserByUserId } from '@/actions/getUserByUserId';

export const getChatByChatId = async (chatId: string): Promise<UserChat | undefined> => {
	const chat = await prisma.chat.findUnique({
		where: { chatId },
		include: { messages: true },
	});
	if (!chat) return;
	const connectedUsers = (await Promise.all(chat.memberIds.map(id => getUserByUserId(id)))) as User[];
	return { ...chat, messages: chat.messages as Message[], members: connectedUsers };
};
