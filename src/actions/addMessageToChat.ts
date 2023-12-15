'use server';
import { prisma } from '@/db';
import { AddMessageToChat, Message, MessageType } from '@/types';
import { revalidatePath } from 'next/cache';
import { CHATS_LIST } from '@/constants';

export async function addMessageToChat({
	chatId,
	authorId,
	authorName,
	messageType,
	messageText,
	messageImageUrl,
	replyToId,
}: AddMessageToChat) {
	if (!messageText && !messageImageUrl) return;
	if (!chatId || !authorId || !authorName) return;

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
	revalidatePath(`${CHATS_LIST}/${chatId}`);
	return createdMessage;
}
