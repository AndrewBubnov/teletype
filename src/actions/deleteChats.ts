'use server';
import { prisma } from '@/db';
import { revalidatePath } from 'next/cache';
import { CHAT_LIST } from '@/constants';

export const deleteChats = async (ids: string[], chatIds: string[]) => {
	if (!ids.length) return;
	await prisma.chat.deleteMany({
		where: { id: { in: ids } },
	});
	await prisma.message.deleteMany({
		where: { chatId: { in: chatIds } },
	});
	revalidatePath(CHAT_LIST);
};
