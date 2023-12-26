'use server';
import { prisma } from '@/db';
import { Message, UpdateMessage } from '@/types';

export async function updateMessage({
	id,
	chatId,
	authorId,
	authorName,
	messageType,
	messageText,
	messageImageUrl,
	replyToId,
}: UpdateMessage) {
	if (!messageText && !messageImageUrl) return;
	if (!chatId || !authorId || !authorName) return;

	const message = prisma.message.findUnique({ where: { id } });

	if (!message) return;

	return prisma.message.upsert({
		where: { id },
		create: {
			id,
			type: messageType,
			text: messageText ? messageText : null,
			imageUrl: messageImageUrl ? messageImageUrl : null,
			chatId,
			authorId,
			authorName,
			replyToId,
		},
		update: {
			type: messageType,
			text: messageText ? messageText : null,
			imageUrl: messageImageUrl ? messageImageUrl : null,
			chatId,
			authorId,
			authorName,
			replyToId,
		},
	}) as Promise<Message>;
}
