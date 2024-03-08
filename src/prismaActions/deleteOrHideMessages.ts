'use server';
import { prisma } from '@/db';
import { Message, UpdateMessageType } from '@/types';

export const deleteOrHideMessages = async (
	messageIds: string[],
	type: UpdateMessageType,
	hideToId: string | null
): Promise<Message[]> => {
	let messages: Message[] = [];
	if (type === UpdateMessageType.DELETE) {
		messages = (await prisma.message.findMany({ where: { id: { in: messageIds } } })) as Message[];
		await prisma.message.deleteMany({ where: { id: { in: messageIds } } });
	} else if (hideToId) {
		await prisma.message.updateMany({
			where: { id: { in: messageIds } },
			data: { isHidden: hideToId },
		});
		messages = (await prisma.message.findMany({ where: { id: { in: messageIds } } })) as Message[];
	}
	return messages;
};
