'use server';
import { prisma } from '@/db';
import { revalidatePath } from 'next/cache';
import { CHAT_LIST } from '@/constants';

export const deleteChats = async (chatIds: string[], messageChatIds: string[]) => {
	if (!chatIds.length) return;
	await prisma.chat.deleteMany({
		where: { id: { in: chatIds } },
	});
	await prisma.message.deleteMany({
		where: { chatId: { in: messageChatIds } },
	});
	revalidatePath(CHAT_LIST);
};
