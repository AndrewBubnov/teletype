import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useCommonStore, useIsWideModeStore, useLastMessageStore } from '@/store';
import { useRouter } from 'next/navigation';
import { sendChangeVisitorStatus } from '@/webSocketActions/sendChangeVisitorStatus';
import { addReaction } from '@/prismaActions/addReaction';
import { Message, UpdateMessage, UpdateMessageType, UserChat, VisitorStatus } from '@/types';
import { useSubscribe } from '@/app/hooks/useSubscribe';
import { addClientMessage, clearAddClientMessage } from '@/webSocketActions/addClientMessage';
import { updateMessageIsRead } from '@/prismaActions/updateMessageIsRead';
import { sendEditMessage } from '@/webSocketActions/sendEditMessage';
import { clearUpdateClientMessage, updateClientMessage } from '@/webSocketActions/updateClientMessage';
import { CHAT_LIST } from '@/constants';

export const useChat = (chat: UserChat) => {
	const { members, chatId } = chat;

	const { userId, chatList } = useCommonStore(state => ({
		userId: state.userId,
		chatList: state.chatList,
	}));
	const isWideMode = useIsWideModeStore(state => state.isWideMode);
	const unreadNumber = useLastMessageStore(state => state.messageMap[chatId]?.unreadNumber);

	const [messageListRaw, setMessageListRaw] = useState<Message[]>(chat.messages);

	const addMessageToList = useCallback(
		(message: Message) => setMessageListRaw(prevState => [...prevState, message]),
		[]
	);

	const { push } = useRouter();

	const firstUnreadRef = useRef<string>('');

	const author = members.find(user => user.userId === userId);
	const interlocutor = members.find(user => user.userId !== userId);
	const interlocutorId = interlocutor?.userId || '';
	const authorId = author?.userId || '';
	const interlocutorName = interlocutor?.username || interlocutor?.email || '';
	const authorName = author?.username || author?.email || '';
	const authorImageUrl = author?.imageUrl;
	const interlocutorImageUrl = interlocutor?.imageUrl;

	useEffect(() => {
		setMessageListRaw(chat.messages);
	}, [chat]);

	useEffect(() => {
		if (isWideMode) push(CHAT_LIST);
	}, [isWideMode, push]);

	useEffect(() => {
		if (!chatList.length) return;
		if (!chatList.map(chat => chat.chatId).includes(chatId)) push(CHAT_LIST);
	}, [chatId, chatList, push]);

	useEffect(() => {
		const rest = { chatId, userId };
		sendChangeVisitorStatus({ status: VisitorStatus.IN, ...rest });

		return () => {
			sendChangeVisitorStatus({ status: VisitorStatus.OUT, ...rest });
		};
	}, [chatId, userId]);

	const updateIsRead = async (message: Message) => {
		const { id, chatId } = message;
		const updated = await updateMessageIsRead(id);
		if (!updated) return;
		sendEditMessage({
			updateData: { [id]: updated },
			type: UpdateMessageType.EDIT,
			roomId: chatId,
		});
		setMessageListRaw(prevState => {
			const predicate = (el: Message): boolean => el.id === id;
			const message = prevState.find(predicate);
			if (message && !message?.isRead) {
				return prevState.map(el => (predicate(el) ? { ...el, isRead: true } : el));
			}
			return prevState;
		});
	};

	const updateMessage = useCallback(
		({ updateData, type }: UpdateMessage) =>
			setMessageListRaw(prevState => {
				if (type === UpdateMessageType.DELETE) {
					const deletedIds = Object.keys(updateData);
					return prevState.filter(el => !deletedIds.includes(el.id));
				}
				return prevState.map(el => {
					if (updateData[el.id]) return updateData[el.id]!;
					return el;
				});
			}),
		[]
	);

	const addReactionToMessage = async (
		message: Message,
		reaction: string,
		authorImageUrl: string | null | undefined
	) => {
		const { id: messageId, chatId } = message;
		const updated = await addReaction({ messageId, reaction, authorImageUrl });
		if (!updated) return;
		sendEditMessage({
			updateData: { [messageId]: updated },
			type: UpdateMessageType.EDIT,
			roomId: chatId,
		});
		setMessageListRaw(prevState =>
			prevState.map(message => {
				if (message.id === messageId) {
					return {
						...message,
						reaction,
						reactionAuthorImageUrl: reaction ? authorImageUrl : undefined,
					};
				}
				return message;
			})
		);
	};

	useSubscribe(addMessageToList, addClientMessage, clearAddClientMessage);

	useSubscribe(updateMessage, updateClientMessage, clearUpdateClientMessage);

	const messageList: Message[] = useMemo(() => {
		return messageListRaw.map((message, index) => {
			const isFirstDateMessage =
				!index ||
				(index &&
					new Date(message.createdAt).getDate() !== new Date(messageListRaw[index - 1].createdAt).getDate());
			if (
				!firstUnreadRef.current &&
				message.authorId !== userId &&
				!message.isRead &&
				(messageListRaw[index - 1]?.isRead || true)
			) {
				firstUnreadRef.current = message.id;
			}
			return {
				...message,
				...(isFirstDateMessage ? { isFirstDateMessage: true } : {}),
			};
		});
	}, [messageListRaw, userId]);

	return {
		messageList,
		addReaction: addReactionToMessage,
		interlocutorName,
		authorImageUrl,
		interlocutorImageUrl,
		chatId,
		authorId,
		interlocutorId,
		authorName,
		unreadNumber,
		updateIsRead,
		firstUnreadId: firstUnreadRef.current || null,
		userId,
	};
};
