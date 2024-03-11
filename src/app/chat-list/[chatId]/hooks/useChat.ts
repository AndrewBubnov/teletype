import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useActiveChatStore, useCommonStore, useIsWideModeStore, useUnreadMessagesStore } from '@/store';
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
	const unreadNumber = useUnreadMessagesStore(state => state.messageMap[chatId]?.unreadNumber) || 0;
	const isActiveChatLoading = useActiveChatStore(state => state.isActiveChatLoading);

	const [messageListRaw, setMessageListRaw] = useState<Message[]>(chat.messages);

	const addMessageToList = useCallback(
		(message: Message) => {
			if (message.chatId !== chatId) return;
			setMessageListRaw(prevState => [...prevState, message]);
		},
		[chatId]
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

	useLayoutEffect(() => {
		setMessageListRaw(chat.messages);
		firstUnreadRef.current = '';
	}, [chat]);

	useEffect(() => {
		if (isWideMode) push(`${CHAT_LIST}?t=${Date.now()}`);
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

	const updateIsRead = useCallback(async (message: Message) => {
		if (message.isRead) return;
		const { id, chatId } = message;
		const updated = await updateMessageIsRead(id);
		if (!updated) return;
		sendEditMessage({
			updateData: [updated],
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
	}, []);

	const updateMessage = useCallback(({ updateData, type }: UpdateMessage) => {
		setMessageListRaw(prevState => {
			const mappedUpdated = updateData.map(el => el.id);
			if (type === UpdateMessageType.DELETE) {
				return prevState.filter(el => !mappedUpdated.includes(el.id));
			}
			return prevState.map(el => {
				const [updated] = updateData;
				if (el.id === updated.id) return updated;
				return el;
			});
		});
	}, []);

	const addReactionToMessage = async (
		message: Message,
		reaction: string,
		authorImageUrl: string | null | undefined
	) => {
		const { id: messageId, chatId } = message;
		const updated = await addReaction({ messageId, reaction, authorImageUrl });
		if (!updated) return;
		sendEditMessage({
			updateData: [updated],
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
		isActiveChatLoading,
		userId,
	};
};
