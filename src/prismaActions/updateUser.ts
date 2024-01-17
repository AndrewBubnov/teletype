'use server';
import { prisma } from '@/db';

export const updateUserDetails = async (id: string, username: string, imageUrl: string | null) => {
	const user = await prisma.user.findUnique({ where: { id } });

	if (!user) return;

	await prisma.user.update({
		where: { id },
		data: {
			username,
			imageUrl,
		},
	});
};
