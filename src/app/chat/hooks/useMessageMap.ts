import { useEffect, useState } from 'react';
import { getUser } from '@/actions/getUser';
import { getUserChats } from '@/actions/getUserChats';
import { addClientMessage, clearAddClientMessage } from '@/utils/addClientMessage';
import { EditMessageClient, Message, MessageMap } from '@/types';
import { clearUpdateClientMessage, updateClientMessage } from '@/utils/updateClientMessage';
import { updateMessageIsRead } from '@/actions/updateMessageIsRead';
import { useUser } from '@clerk/nextjs';
import { useLatest } from '@/app/chat/hooks/useLatest';

export const useMessageMap = () => {
	const { user } = useUser();
	const userId = user?.id as string;
	const [messageMap, setMessageMap] = useState<MessageMap>({} as MessageMap);

	const messagesMapRef = useLatest(messageMap);

	useEffect(() => {
		(async function () {
			const user = await getUser();
			const userChats = await getUserChats(user.chatIds);
			const map: MessageMap = userChats.reduce((acc, cur) => {
				acc[cur.chatId] = cur.messages;
				return acc;
			}, {} as MessageMap);
			setMessageMap(map);
		})();
	}, []);

	useEffect(() => {
		const handler = (message: Message) =>
			setMessageMap(prevState => {
				if (!message.chatId) return prevState;
				if (prevState[message.chatId])
					return {
						...prevState,
						[message.chatId]: [...prevState[message.chatId], message],
					};
				return {
					...prevState,
					[message.chatId]: [message],
				};
			});
		addClientMessage(handler);
		return () => {
			clearAddClientMessage(handler);
		};
	}, []);

	useEffect(() => {
		const handler = ({ message, messageId, roomId: chatId }: EditMessageClient) => {
			setMessageMap(prevState => {
				if (!message)
					return {
						...prevState,
						[chatId]: prevState[chatId].filter(el => el.id !== messageId),
					};
				return {
					...prevState,
					[chatId]: prevState[chatId].map(el => (el.id === messageId ? message : el)),
				};
			});
		};

		updateClientMessage(handler);
		return () => {
			clearUpdateClientMessage(handler);
		};
	}, []);

	const updateIsReadMap = (chatId: string) => async (id: string) => {
		const predicate = (el: Message): boolean => el.id === id && el.authorId !== userId;
		const message = messagesMapRef.current[chatId].find(predicate);
		setMessageMap(prevState => ({
			...prevState,
			[chatId]: prevState[chatId].map(el => (predicate(el) ? { ...el, isRead: true } : el)),
		}));
		if (message) await updateMessageIsRead(id);
	};

	const addReactionMap = (chatId: string, authorImageUrl: string | null) => (id: string, reaction: string) =>
		setMessageMap(prevState => ({
			...prevState,
			[chatId]: prevState[chatId].map(message => {
				if (message.id === id) {
					return { ...message, reaction, reactionAuthorImageUrl: reaction ? authorImageUrl : null };
				}
				return message;
			}),
		}));

	return { messageMap, updateIsReadMap, addReactionMap };
};
