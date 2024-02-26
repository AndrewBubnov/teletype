'use server';

import { prisma } from '@/db';
import { auth } from '@clerk/nextjs';

export const getUnreadNumber = async (chatId: string) => {
	const userId = auth().userId!;
	const unreadMessages = await prisma.message.findMany({
		where: { chatId, isRead: false, isHidden: undefined, authorId: { not: userId } },
	});
	return unreadMessages.length;
};
