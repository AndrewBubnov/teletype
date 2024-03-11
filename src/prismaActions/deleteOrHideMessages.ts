'use server';
import { prisma } from '@/db';
import { auth } from '@clerk/nextjs';
import { Message, UpdateMessageType } from '@/types';

const deleteMessages = async (messageIds: string[]) => {
	const userId = auth().userId as string;
	const messages = (await prisma.message.findMany({
		where: { id: { in: messageIds }, isHidden: { not: userId } },
	})) as Message[];
	await prisma.message.deleteMany({ where: { id: { in: messageIds } } });
	return messages;
};

const hideMessages = async (messageIds: string[], hideToId: string) => {
	await prisma.message.updateMany({
		where: { id: { in: messageIds } },
		data: { isHidden: hideToId },
	});
	return prisma.message.findMany({
		where: { id: { in: messageIds } },
	}) as Promise<Message[]>;
};

export const deleteOrHideMessages = async (messageIds: string[], type: UpdateMessageType, hideToId: string | null) =>
	type === UpdateMessageType.DELETE ? deleteMessages(messageIds) : hideMessages(messageIds, hideToId || '');
