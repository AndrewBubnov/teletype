import { useCallback, useContext, useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { createRoom } from '@/utils/createRoom';
import { sendChangeVisitorStatus } from '@/utils/sendChangeVisitorStatus';
import { useLatest } from '@/app/chat/hooks/useLatest';
import { updateMessageIsRead } from '@/actions/updateMessageIsRead';
import { deleteReadMessages } from '@/actions/deleteReadMessages';
import { MessageContext } from '@/app/chat/providers/MessageProvider';
import { Message, UserChat, VisitorStatus } from '@/types';

export const useChat = (chat: UserChat) => {
	const { user } = useUser();
	const userId = user?.id as string;
	const { members, chatId } = chat;
	const author = members.find(user => user.userId === userId);
	const interlocutor = members.find(user => user.userId !== userId);
	const interlocutorId = interlocutor?.userId || '';
	const interlocutorName = interlocutor?.username || interlocutor?.email || '';
	const authorName = author?.username || author?.email || '';
	const authorImageUrl = author?.imageUrl;
	const interlocutorImageUrl = interlocutor?.imageUrl;

	const { messageMap, addReactionMap, updateIsReadMap } = useContext(MessageContext);
	const messageList = messageMap[chatId] || [];

	const messageListRef = useLatest(messageList);

	useEffect(() => {
		deleteReadMessages(chatId).then();
	}, [chatId]);

	useEffect(() => {
		createRoom(chatId, interlocutorId);
	}, [chatId, interlocutorId]);

	useEffect(() => {
		const rest = { chatId, userId };
		sendChangeVisitorStatus({ status: VisitorStatus.IN, ...rest });

		return () => {
			sendChangeVisitorStatus({ status: VisitorStatus.OUT, ...rest });
		};
	}, [chatId, userId]);

	const unreadNumber = messageList.filter(el => !el.isRead && el.authorId !== userId).length;

	const updateIsRead = updateIsReadMap(chatId);

	const addReaction = addReactionMap(chatId, authorImageUrl);

	return {
		messageList,
		addReaction,
		interlocutorName,
		interlocutorImageUrl,
		chatId,
		interlocutorId,
		authorName,
		unreadNumber,
		updateIsRead,
	};
};
