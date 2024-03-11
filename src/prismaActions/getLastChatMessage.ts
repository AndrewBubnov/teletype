'use server';

import { prisma } from '@/db';
import { Message } from '@/types';
import { auth } from '@clerk/nextjs';

export const getLastChatMessage = (chatId: string) => {
	const userId = auth().userId as string;
	return prisma.message.findFirst({
		where: { chatId, isHidden: { not: userId } },
		orderBy: { createdAt: 'desc' },
	}) as Promise<Message>;
};
