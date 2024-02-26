import { Chat } from '@/app/chat-list/[chatId]/components/Chat/Chat';
import { getChatByChatId } from '@/prismaActions/getChatByChatId';
import { ActiveChatProps } from '@/types';
import { getChatMessages } from '@/prismaActions/getChatMessages';

export default async function ActiveChat({ params: { chatId } }: ActiveChatProps) {
	const chat = await getChatByChatId(chatId);

	if (!chat) return null;

	return <Chat chat={chat} />;
}
