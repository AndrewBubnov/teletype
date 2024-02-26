'use server';

import { prisma } from '@/db';

export const getUnreadNumber = async (chatId: string) => {
	const unreadMessages = await prisma.message.findMany({ where: { chatId, isRead: false, isHidden: undefined } });
	return unreadMessages.length;
};
