'use server';
import { prisma } from '@/db';

export const getEmailsByIds = async (idsArray: string[]) => {
	const users = await prisma.user.findMany({
		where: { userId: { in: idsArray } },
	});

	return users.map(user => user.email);
};
