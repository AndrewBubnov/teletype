import { createChat } from '@/actions/createChat';
import { addUserChat } from '@/utils/addUserChat';
import { sendChangeVisitorStatus } from '@/utils/sendChangeVisitorStatus';
import { UserChat, VisitorStatus } from '@/types';

export const onCreateChat = async (userId: string, connectedUserId: string) => {
	const chat: UserChat = await createChat(userId, connectedUserId);
	addUserChat(chat);
	sendChangeVisitorStatus({ status: VisitorStatus.OUT, userId, chatId: chat.chatId });
	sendChangeVisitorStatus({ status: VisitorStatus.OUT, userId: connectedUserId, chatId: chat.chatId });
};
