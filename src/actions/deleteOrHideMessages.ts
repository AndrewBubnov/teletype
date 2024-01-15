'use server';
import { prisma } from '@/db';
import { Message } from '@/types';

export const deleteOrHideMessages = async (messageIds: string[], deleteIdsArray: string[]): Promise<Message[]> => {
	if (deleteIdsArray.length > 1) {
		await prisma.message.deleteMany({ where: { id: { in: messageIds } } });
	} else {
		await prisma.message.updateMany({
			where: { id: { in: messageIds } },
			data: { hidden: deleteIdsArray },
		});
	}
	return prisma.message.findMany({ where: { id: { in: messageIds } } }) as Promise<Message[]>;
};
