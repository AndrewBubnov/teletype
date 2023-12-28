'use server';
import { prisma } from '@/db';
import { revalidatePath } from 'next/cache';
import { CHAT_LIST } from '@/constants';

export const addChatIdToUserChatIdsList = async (userId: string, chatId: string) => {
	const user = await prisma.user.findUnique({
		where: { userId },
	});

	if (!user) return;

	const { chatIds } = user;

	const updatedChatIds = Array.from(new Set([...chatIds, chatId]));

	await prisma.user.update({
		where: { userId },
		data: { chatIds: updatedChatIds },
	});

	revalidatePath(CHAT_LIST);
};
