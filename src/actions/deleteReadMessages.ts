'use server';
import { prisma } from '@/db';

export const deleteReadMessages = async (chatId: string) => {
	const existingChat = await prisma.chat.findUnique({
		where: { chatId },
	});

	if (!existingChat) return;

	const updatedMessages = await prisma.message.findMany({
		where: { chatId, isRead: false },
	});

	await prisma.message.deleteMany({
		where: { chatId, isRead: true },
	});

	await prisma.chat.update({
		where: { chatId },
		data: { messageIds: { set: updatedMessages.map(el => el.id) } },
	});
};
