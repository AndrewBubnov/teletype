'use server';
import { prisma } from '@/db';

export const deleteChatMessages = async (chatId: string) => {
	const existingChat = await prisma.chat.findUnique({
		where: { chatId },
	});

	if (!existingChat) return;

	await prisma.message.deleteMany({
		where: { chatId },
	});

	await prisma.chat.update({
		where: { chatId },
		data: { messages: { set: [] } },
	});
};
