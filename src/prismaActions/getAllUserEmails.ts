'use server';
import { prisma } from '@/db';
import { currentUser } from '@clerk/nextjs';
import { getUserChats } from '@/prismaActions/getUserChats';
import { getEmailsByIds } from '@/prismaActions/getEmailsByIds';

export const getAllUserEmails = async () => {
	const user = await currentUser();

	if (!user) return [];

	const myEmail = user?.emailAddresses[0].emailAddress || '';
	const users = await prisma.user.findMany();
	const currentChatUser = await prisma.user.findUnique({ where: { userId: user.id } });
	const chats = await getUserChats(currentChatUser?.chatIds || []);
	const existingChatMemberIds = chats.map(el => el.memberIds).flat();
	const existingChatEmails = await getEmailsByIds(existingChatMemberIds);

	return (users || []).map(el => el.email).filter(el => el !== myEmail && !existingChatEmails.includes(el));
};
