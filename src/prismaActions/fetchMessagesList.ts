'use server';
import { prisma } from '@/db';
import { Message } from '@/types';

export const fetchMessagesList = async (chatId: string) =>
	prisma.message.findMany({ where: { chatId } }) as Promise<Message[]>;
