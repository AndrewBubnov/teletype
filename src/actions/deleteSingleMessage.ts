'use server';
import { prisma } from '@/db';

export const deleteSingleMessage = async (messageId: string, chatId: string) => {
	const chat = await prisma.chat.findUnique({
		where: { chatId },
		include: { messages: true },
	});

	if (!chat) return;

	await prisma.message.delete({
		where: { id: messageId },
	});

	const updated = chat.messages.filter(el => el.id !== messageId);

	await prisma.chat.update({
		where: { chatId },
		data: { messages: { set: updated } },
	});
};
