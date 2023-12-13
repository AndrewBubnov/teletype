'use server';
import { prisma } from '@/db';
import { auth } from '@clerk/nextjs';
import { Message } from '@/types';

export const addReactionToMessage = async (messageId: string, reaction: string) => {
	const userId = auth().userId as string;
	const message = await prisma.message.findUnique({ where: { id: messageId } });
	if (!message) return;
	const user = await prisma.user.findUnique({ where: { userId } });
	return prisma.message.update({
		where: { id: messageId },
		data: { reaction, reactionAuthorImageUrl: reaction ? user?.imageUrl : null },
	}) as Promise<Message>;
};
