import { Chat } from '@/app/chat/[chatId]/components/Chat';
import { getChatByChatId } from '@/actions/getChatByChatId';
import { ActiveChatProps } from '@/types';
import { deleteChatMessages } from '@/actions/deleteChatMessages';

export default async function ActiveChat({ params: { chatId } }: ActiveChatProps) {
	const chat = await getChatByChatId(chatId);
	// await deleteChatMessages(chatId);

	if (!chat) return null;

	return <Chat chat={chat} />;
}
