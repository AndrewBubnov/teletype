'use server';
import { prisma } from '@/db';

export const updateMessageIsRead = async (messageId: string) => {
	const message = await prisma.message.findUnique({ where: { id: messageId } });
	if (!message) return;
	return prisma.message.update({
		where: { id: messageId },
		data: { isRead: true },
	});
};
