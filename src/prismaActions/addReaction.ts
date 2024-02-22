'use server';
import { prisma } from '@/db';
import { AddReaction, Message } from '@/types';

export const addReaction = async ({ messageId, reaction, authorImageUrl }: AddReaction) => {
	const message = await prisma.message.findUnique({ where: { id: messageId } });

	if (!message) return;
	return prisma.message.update({
		where: { id: messageId },
		data: { reaction, reactionAuthorImageUrl: reaction ? authorImageUrl : null },
	}) as Promise<Message>;
};
