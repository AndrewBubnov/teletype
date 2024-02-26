'use server';
import { prisma } from '@/db';
import { Message, User, UserChat } from '@/types';
import { getUserByUserId } from '@/prismaActions/getUserByUserId';

export const getChatMessages = async (chatId: string) =>
	prisma.message.findMany({
		where: { chatId },
	}) as Promise<Message[]>;
