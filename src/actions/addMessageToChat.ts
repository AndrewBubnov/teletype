'use server';
import { prisma } from '@/db';
import { AddMessageToChat, Message, MessageType } from '@/types';

export async function addMessageToChat({
	chatId,
	authorId,
	authorName,
	messageType,
	messageText,
	messageImageUrl,
	replyToId,
}: AddMessageToChat) {
	if (!messageText) return;

	const createdMessage = (await prisma.message.create({
		data: {
			type: messageType,
			...(messageType === MessageType.TEXT ? { text: messageText } : { imageUrl: messageImageUrl }),
			chatId,
			authorId,
			authorName,
			replyToId,
		},
	})) as Message;

	await prisma.chat.update({
		where: { chatId },
		data: {
			messages: {
				connect: [{ id: createdMessage.id }],
			},
		},
		include: { messages: true },
	});
	return createdMessage;
}
