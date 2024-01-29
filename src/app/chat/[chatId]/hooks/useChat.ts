import { useEffect, useMemo } from 'react';
import { useCommonStore, useMessageStore } from '@/store';
import { useRouter } from 'next/navigation';
import { sendChangeVisitorStatus } from '@/webSocketActions/sendChangeVisitorStatus';
import { CHAT_LIST } from '@/constants';
import { UserChat, VisitorStatus } from '@/types';

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

	const { push } = useRouter();

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
		if (!chatList.map(chat => chat.chatId).includes(chatId)) push(CHAT_LIST);
	}, [chatId, chatList, push]);

	useEffect(() => {
		const rest = { chatId, userId };
		sendChangeVisitorStatus({ status: VisitorStatus.IN, ...rest });

		return () => {
			sendChangeVisitorStatus({ status: VisitorStatus.OUT, ...rest });
		};
	}, [chatId, userId]);

	const messageList = useMemo(() => messageMap[chatId] || [], [chatId, messageMap]);

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
		userId,
	};
};
