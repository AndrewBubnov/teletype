'use server';
import { prisma } from '@/db';

export const deleteSingleMessage = async (messageId: string, chatId: string) => {
	const chat = await prisma.chat.findUnique({
		where: { chatId },
	});

	const message = await prisma.message.findUnique({
		where: { id: messageId },
	});

	if (!chat || !message) return;

	await prisma.message.delete({
		where: { id: messageId },
	});

	const updated = chat.messageIds.filter(el => el !== messageId);

	await prisma.chat.update({
		where: { chatId },
		data: { messageIds: { set: updated } },
	});
};
