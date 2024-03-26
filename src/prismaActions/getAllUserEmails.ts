'use server';
import { prisma } from '@/db';
import { currentUser } from '@clerk/nextjs';
import { getUserChats } from '@/prismaActions/getUserChats';
import { getEmailsByIds } from '@/prismaActions/getEmailsByIds';

export const getAllUserEmails = async () => {
	const user = await currentUser();

	if (!user) return [];

	const users = await prisma.user.findMany();
	const currentChatUser = await prisma.user.findUnique({ where: { userId: user.id } });
	const chats = await getUserChats(currentChatUser?.chatIds || []);
	const excludedEmails = chats.map(el => el.members.map(item => item.email)).flat();

	const uniqueUserEmails = users.map(el => el.email);

	return uniqueUserEmails.filter(el => !excludedEmails.includes(el));
};
