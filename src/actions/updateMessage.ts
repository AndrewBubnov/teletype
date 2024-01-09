'use server';
import { prisma } from '@/db';
import { Message } from '@/types';

export const updateMessage = async (messageId: string, message: Message) => {
	const existing = prisma.message.findUnique({ where: { id: messageId } });

	if (!existing) return;

	if (!message) return prisma.message.delete({ where: { id: messageId } });

	const { id, ...rest } = message;

	return prisma.message.update({
		where: { id },
		data: { ...rest },
	});
};
