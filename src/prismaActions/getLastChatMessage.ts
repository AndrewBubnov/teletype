'use server';

import { prisma } from '@/db';
import { Message } from '@/types';

export const getLastChatMessage = (chatId: string) =>
	prisma.message.findFirst({
		where: { chatId, isHidden: null },
		orderBy: { createdAt: 'desc' },
	}) as Promise<Message>;
