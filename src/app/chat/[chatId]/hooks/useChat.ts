import { useEffect, useMemo } from 'react';
import { useStore } from '@/store';
import { useUser } from '@clerk/nextjs';
import { sendChangeVisitorStatus } from '@/utils/sendChangeVisitorStatus';
import { UserChat, VisitorStatus } from '@/types';

export const useChat = (chat: UserChat) => {
	const { user } = useUser();
	const userId = user?.id as string;
	const { members, chatId } = chat;
	const author = members.find(user => user.userId === userId);
	const interlocutor = members.find(user => user.userId !== userId);
	const interlocutorId = interlocutor?.userId || '';
	const authorId = author?.userId || '';
	const interlocutorName = interlocutor?.username || interlocutor?.email || '';
	const authorName = author?.username || author?.email || '';
	const authorImageUrl = author?.imageUrl;
	const interlocutorImageUrl = interlocutor?.imageUrl;

	const { messageMap, updateIsReadMap, addReactionMap } = useStore(state => ({
		messageMap: state.messageMap,
		updateIsReadMap: state.updateIsReadMap,
		addReactionMap: state.addReactionMap,
	}));

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

	const updateIsRead = updateIsReadMap(chatId);

	const addReaction = addReactionMap(chatId, authorImageUrl);

	return {
		messageList,
		addReaction,
		interlocutorName,
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
