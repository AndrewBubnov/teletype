'use server';
import { prisma } from '@/db';
import { Message } from '@/types';

export const updateMessage = async (
	messageId: string,
	message: Omit<Message, 'id' | 'createdAt' | 'isRead'> | null
) => {
	const existing = await prisma.message.findUnique({ where: { id: messageId } });

	if (!existing) return;

	if (!message) return prisma.message.delete({ where: { id: messageId } });

	return prisma.message.update({
		where: { id: messageId },
		data: { ...message },
	});
};
