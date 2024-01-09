'use server';
import { prisma } from '@/db';
import { DELETE_MESSAGE_DELAY } from '@/constants';
import { UserChat } from '@/types';

export const deleteReadMessages = async (userChats: UserChat[]) => {
	const chatIds = userChats.map(chat => chat.chatId);
	const deletionDelayTime = new Date(Date.now() - DELETE_MESSAGE_DELAY);
	return prisma.message.deleteMany({
		where: {
			chatId: { in: chatIds },
			createdAt: {
				lt: deletionDelayTime,
			},
		},
	});
};
