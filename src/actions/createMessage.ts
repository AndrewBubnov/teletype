'use server';
import { prisma } from '@/db';
import { CreateMessage, Message } from '@/types';

export const createMessage = ({ chatId, authorId, authorName, type, text, imageUrl, replyToId }: CreateMessage) => {
	if (!text && !imageUrl) return;
	if (!chatId || !authorId || !authorName) return;

	return prisma.message.create({
		data: {
			type,
			text: text || null,
			imageUrl: imageUrl || null,
			chatId,
			authorId,
			authorName,
			replyToId,
		},
	}) as Promise<Message>;
};
