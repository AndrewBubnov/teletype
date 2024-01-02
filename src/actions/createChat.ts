'use server';
import { prisma } from '@/db';
import { addChatIdToUserChatIdsList } from '@/actions/addChatIdToUserChatIdsList';
import { Message, User, UserChat } from '@/types';
import { getUserByUserId } from '@/actions/getUserByUserId';

export async function createChat(userAId: string, userBId: string): Promise<UserChat> {
	const chatId = `${userAId}-${userBId}`;
	const revertedChatId = `${userBId}-${userAId}`;

	const [existingChat] = await prisma.chat.findMany({
		where: { chatId: { in: [chatId, revertedChatId] } },
	});

	if (existingChat) {
		const connectedUsers = (await Promise.all(existingChat.memberIds.map(id => getUserByUserId(id)))) as User[];
		return { ...existingChat, members: connectedUsers };
	}

	const chat = await prisma.chat.create({
		data: {
			chatId,
			memberIds: [userAId, userBId],
		},
	});
	const connectedUsers = (await Promise.all([userAId, userBId].map(id => getUserByUserId(id)))) as User[];

	await addChatIdToUserChatIdsList(userAId, chatId);
	await addChatIdToUserChatIdsList(userBId, chatId);

	return { ...chat, members: connectedUsers };
}
