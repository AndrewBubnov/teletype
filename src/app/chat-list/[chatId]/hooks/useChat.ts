import { useEffect, useMemo, useRef } from 'react';
import { useCommonStore, useIsWideModeStore, useLeftSideWidthStore, useMessageStore } from '@/store';
import { useRouter } from 'next/navigation';
import { sendChangeVisitorStatus } from '@/webSocketActions/sendChangeVisitorStatus';
import { CHAT_LIST } from '@/constants';
import { Message, UserChat, VisitorStatus } from '@/types';

export const useChat = (chat: UserChat) => {
	const { messageMap, updateIsRead, addReaction } = useMessageStore(state => ({
		messageMap: state.messageMap,
		updateIsRead: state.updateIsRead,
		addReaction: state.addReaction,
	}));
	const { userId, chatList } = useCommonStore(state => ({
		userId: state.userId,
		chatList: state.chatList,
	}));
	const isWideMode = useIsWideModeStore(state => state.isWideMode);

	const { push } = useRouter();

	const firstUnreadRef = useRef<string>('');

	const { members, chatId } = chat;
	const author = members.find(user => user.userId === userId);
	const interlocutor = members.find(user => user.userId !== userId);
	const interlocutorId = interlocutor?.userId || '';
	const authorId = author?.userId || '';
	const interlocutorName = interlocutor?.username || interlocutor?.email || '';
	const authorName = author?.username || author?.email || '';
	const authorImageUrl = author?.imageUrl;
	const interlocutorImageUrl = interlocutor?.imageUrl;

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

	const messageList: Message[] = useMemo(() => {
		const list = messageMap[chatId] || [];
		return list.map((message, index) => {
			const isFirstDateMessage =
				!index ||
				(index && new Date(message.createdAt).getDate() !== new Date(list[index - 1].createdAt).getDate());
			if (
				!firstUnreadRef.current &&
				message.authorId !== userId &&
				!message.isRead &&
				(list[index - 1]?.isRead || true)
			) {
				firstUnreadRef.current = message.id;
			}
			return {
				...message,
				...(isFirstDateMessage ? { isFirstDateMessage: true } : {}),
			};
		});
	}, [chatId, messageMap, userId]);

	const unreadNumber = useMemo(() => {
		if (!userId) return 0;
		return messageList.filter(el => !el.isRead && el.authorId !== userId).length;
	}, [userId, messageList]);

	return {
		messageList,
		addReaction,
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
