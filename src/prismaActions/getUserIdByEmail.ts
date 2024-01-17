'use server';
import { prisma } from '@/db';

export const getUserIdByEmail = async (email: string | null) => {
	if (!email) return '';
	const user = await prisma.user.findUnique({
		where: {
			email,
		},
	});

	return user?.userId || '';
};
