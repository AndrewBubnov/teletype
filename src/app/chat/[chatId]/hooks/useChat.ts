import { useEffect, useMemo } from 'react';
import { useStore } from '@/store';
import { sendChangeVisitorStatus } from '@/utils/sendChangeVisitorStatus';
import { UserChat, VisitorStatus } from '@/types';

export const useChat = (chat: UserChat) => {
	const { messageMap, updateIsRead, addReaction, userId } = useStore(state => ({
		messageMap: state.messageMap,
		updateIsRead: state.updateIsRead,
		addReaction: state.addReaction,
		userId: state.userId,
	}));
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
