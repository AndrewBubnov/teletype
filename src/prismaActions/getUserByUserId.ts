'use server';
import { prisma } from '@/db';

export const getUserByUserId = async (userId: string) =>
	prisma.user.findUnique({
		where: { userId },
	});
