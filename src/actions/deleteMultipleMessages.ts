'use server';
import { prisma } from '@/db';

export const deleteMultipleMessages = async (ids: string[]) =>
	prisma.message.deleteMany({
		where: { id: { in: ids } },
	});
