'use server';
import { prisma } from '@/db';
import { Message } from '@/types';

export const deleteMessage = async (messageId: string, deleteIdsArray: string[]) => {
	const existing = await prisma.message.findUnique({ where: { id: messageId } });

	if (!existing) return;

	if (deleteIdsArray.length > 1) {
		await prisma.message.delete({ where: { id: messageId } });
		return;
	}

	return prisma.message.update({
		where: { id: messageId },
		data: { hidden: deleteIdsArray },
	}) as Promise<Message>;
};
