import { useCallback, useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { createRoom } from '@/utils/createRoom';
import { sendChangeVisitorStatus } from '@/utils/sendChangeVisitorStatus';
import { deleteChatMessages } from '@/actions/deleteChatMessages';
import { clearAddClientMessage, addClientMessage } from '@/utils/addClientMessage';
import { clearUpdateClientMessage, updateClientMessage } from '@/utils/updateClientMessage';
import { EditMessageClient, Message, UserChat, VisitorStatus } from '@/types';
export const useChat = (chat: UserChat) => {
	const { user } = useUser();
	const userId = user?.id as string;
	const { messages, members, chatId } = chat;
	const author = members.find(user => user.userId === userId);
	const interlocutor = members.find(user => user.userId !== userId);
	const interlocutorId = interlocutor?.userId || '';
	const interlocutorName = interlocutor?.username || interlocutor?.email || '';
	const authorImageUrl = author?.imageUrl;
	const interlocutorImageUrl = interlocutor?.imageUrl;

	const [messageList, setMessageList] = useState<Message[]>(messages);

	useEffect(() => {
		createRoom(chatId, interlocutorId);
	}, [chatId, interlocutorId]);

	useEffect(() => {
		const rest = { chatId, userId };
		sendChangeVisitorStatus({ status: VisitorStatus.IN, ...rest });
		deleteChatMessages(chatId).then();
		return () => {
			sendChangeVisitorStatus({ status: VisitorStatus.OUT, ...rest });
		};
	}, [chatId, userId]);

	useEffect(() => {
		const handler = (message: Message) => setMessageList(prevList => [...prevList, message]);
		addClientMessage(handler);
		return () => {
			clearAddClientMessage(handler);
		};
	}, []);

	useEffect(() => {
		const handler = ({ message, messageId }: EditMessageClient) =>
			setMessageList(prevList => {
				if (!message) return prevList.filter(el => el.id !== messageId);
				return prevList.map(el => (el.id === messageId ? message : el));
			});
		updateClientMessage(handler);
		return () => {
			clearUpdateClientMessage(handler);
		};
	}, []);

	const addReaction = useCallback(
		(id: string, reaction: string) =>
			setMessageList(prevState =>
				prevState.map(message => {
					if (message.id === id) {
						return { ...message, reaction, reactionAuthorImageUrl: reaction ? authorImageUrl : null };
					}
					return message;
				})
			),
		[authorImageUrl]
	);

	return { messageList, addReaction, interlocutorName, interlocutorImageUrl, userId, chatId, interlocutorId };
};
