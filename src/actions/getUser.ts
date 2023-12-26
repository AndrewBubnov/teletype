'use server';
import { prisma } from '@/db';
import { currentUser } from '@clerk/nextjs';

export const getUser = async () => {
	const user = await currentUser();
	const userId = user?.id as string;
	const imageUrl = user?.imageUrl as string;
	const username = user?.username || '';
	const email = user?.emailAddresses[0].emailAddress || '';

	let existingUser = await prisma.user.findUnique({
		where: { userId },
	});

	if (!existingUser) {
		const createUser = await prisma.user.create({
			data: {
				userId,
				email,
				username,
				imageUrl,
				chatIds: { set: [] },
			},
		});
		existingUser = {
			id: createUser.id,
			userId: createUser.userId,
			email: createUser.email,
			username: createUser.username,
			imageUrl: createUser.imageUrl,
			chatIds: [],
		};
	}

	return existingUser;
};
