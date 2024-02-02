import { Chat } from '@/app/chat/[chatId]/components/Chat';
import { getChatByChatId } from '@/prismaActions/getChatByChatId';
import { fetchMessagesList } from '@/prismaActions/fetchMessagesList';
import { ActiveChatProps } from '@/types';

export default async function ActiveChat({ params: { chatId } }: ActiveChatProps) {
	const [chat, messagesList] = await Promise.all([getChatByChatId(chatId), fetchMessagesList(chatId)]);

	if (!chat) return null;

	return <Chat chat={chat} fetchedMessagesList={messagesList} />;
}
