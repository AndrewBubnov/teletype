import { createChat } from '@/prismaActions/createChat';
import { addUserChat } from '@/webSocketActions/addUserChat';
import { sendChangeVisitorStatus } from '@/webSocketActions/sendChangeVisitorStatus';
import { UserChat, VisitorStatus } from '@/types';
import { withErrorNotification } from '@/app/shared/utils/withErrorNotification';

export const onCreateChat = async (userId: string, connectedUserId: string) => {
	const chat = await withErrorNotification(createChat, userId, connectedUserId);
	if (!chat) return;
	addUserChat(chat);
	sendChangeVisitorStatus({ status: VisitorStatus.OUT, userId, chatId: chat.chatId });
	sendChangeVisitorStatus({ status: VisitorStatus.OUT, userId: connectedUserId, chatId: chat.chatId });
};
