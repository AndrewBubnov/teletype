'use server';
import { prisma } from '@/db';
import { revalidatePath } from 'next/cache';
import { CHAT_LIST } from '@/constants';

export const deleteChats = async (idsArray: string[]) => {
	if (!idsArray.length) return;
	await prisma.message.deleteMany({
		where: { chatId: { in: idsArray } },
	});
	await prisma.chat.deleteMany({
		where: { chatId: { in: idsArray } },
	});
	revalidatePath(CHAT_LIST);
};
