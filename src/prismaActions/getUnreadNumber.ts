'use server';

import { prisma } from '@/db';
import { auth } from '@clerk/nextjs';

export const getUnreadNumber = async (chatId: string) => {
	const userId = auth().userId as string;
	const unread = await prisma.message.findMany({ where: { chatId, authorId: { not: userId }, isRead: false } });
	return unread.length;
};
