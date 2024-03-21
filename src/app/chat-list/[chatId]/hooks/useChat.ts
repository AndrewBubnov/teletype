import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useActiveChatStore, useCommonStore, useIsWideModeStore, useUnreadMessagesStore } from '@/store';
import { useRouter } from 'next/navigation';
import { sendChangeVisitorStatus } from '@/webSocketActions/sendChangeVisitorStatus';
import { addReaction } from '@/prismaActions/addReaction';
import { useSubscribe } from '@/app/hooks/useSubscribe';
import { addClientMessage, clearAddClientMessage } from '@/webSocketActions/addClientMessage';
import { updateMessageIsRead } from '@/prismaActions/updateMessageIsRead';
import { sendEditMessage } from '@/webSocketActions/sendEditMessage';
import { clearUpdateClientMessage, updateClientMessage } from '@/webSocketActions/updateClientMessage';
import { sendUpdateIsRead } from '@/webSocketActions/sendUpdateIsRead';
import { clearUpdateIsReadListener, updateIsReadListener } from '@/webSocketActions/updateIsReadListener';
import { isReadSetter } from '@/app/chat-list/[chatId]/utils/isReadSetter';
import { addReactionSetter } from '@/app/chat-list/[chatId]/utils/addReactionSetter';
import { updateMessageSetter } from '@/app/chat-list/[chatId]/utils/updateMessageSetter';
import { CHAT_LIST } from '@/constants';
import { Message, UpdateIsRead, UpdateMessage, UpdateMessageType, UserChat, VisitorStatus } from '@/types';

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
	}, [chat.messages]);

	useLayoutEffect(() => {
		if (!isWideMode) return;
		firstUnreadRef.current = '';
	}, [chatId, isWideMode]);

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

	const updateIsRead = useCallback(async (message: Message) => {
		const { id, chatId } = message;
		sendUpdateIsRead({ roomId: chatId, messageId: message.id });
		setMessageListRaw(prevState => prevState.map(el => (el.id === message.id ? { ...el, isRead: true } : el)));
		await updateMessageIsRead(id);
	}, []);

	const updateMessage = useCallback(
		({ updateData, type }: UpdateMessage) => setMessageListRaw(updateMessageSetter(updateData, type)),
		[]
	);

	const addReactionToMessage = useCallback(
		async (message: Message, reaction: string, authorImageUrl: string | null | undefined) => {
			const { id: messageId, chatId } = message;
			const updated = await addReaction({ messageId, reaction, authorImageUrl });
			if (!updated) return;
			sendEditMessage({ updateData: [updated], type: UpdateMessageType.EDIT, roomId: chatId });
			setMessageListRaw(addReactionSetter(messageId, reaction, authorImageUrl));
		},
		[]
	);

	const isReadListener = useCallback(({ messageId }: UpdateIsRead) => setMessageListRaw(isReadSetter(messageId)), []);

	useSubscribe(addMessageToList, addClientMessage, clearAddClientMessage);

	useSubscribe(updateMessage, updateClientMessage, clearUpdateClientMessage);

	useSubscribe(isReadListener, updateIsReadListener, clearUpdateIsReadListener);

	const messageList: Message[] = useMemo(() => {
		return messageListRaw.map((message, index) => {
			const { createdAt, authorId, isRead } = message;
			const isFirstDateMessage =
				!index ||
				(index && new Date(createdAt).getDate() !== new Date(messageListRaw[index - 1].createdAt).getDate());
			if (
				!firstUnreadRef.current &&
				authorId !== userId &&
				!isRead &&
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
		firstUnreadId: firstUnreadRef.current,
		isActiveChatLoading,
		userId,
	};
};
