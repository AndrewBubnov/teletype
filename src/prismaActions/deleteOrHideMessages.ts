'use server';
import { prisma } from '@/db';
import { Message, UpdateMessageType } from '@/types';

export const deleteOrHideMessages = async (
	messageIds: string[],
	type: UpdateMessageType,
	hideToId: string | null
): Promise<Message[]> => {
	if (type === UpdateMessageType.DELETE) {
		await prisma.message.deleteMany({ where: { id: { in: messageIds } } });
	} else if (hideToId) {
		await prisma.message.updateMany({
			where: { id: { in: messageIds } },
			data: { isHidden: hideToId },
		});
	}
	return prisma.message.findMany({ where: { id: { in: messageIds } } }) as Promise<Message[]>;
};
