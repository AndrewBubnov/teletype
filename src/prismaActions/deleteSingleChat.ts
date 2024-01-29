'use server';
import { prisma } from '@/db';
import { revalidatePath } from 'next/cache';
import { CHAT_LIST } from '@/constants';

export const deleteSingleChat = async (chatId: string) => {
	await prisma.message.deleteMany({
		where: { chatId },
	});
	await prisma.chat.delete({
		where: { chatId },
	});

	revalidatePath(CHAT_LIST);
};
