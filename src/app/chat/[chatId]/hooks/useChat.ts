import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useCommonStore, useMessageStore } from '@/store';
import { useRouter } from 'next/navigation';
import { sendChangeVisitorStatus } from '@/webSocketActions/sendChangeVisitorStatus';
import { CHAT_LIST } from '@/constants';
import { Message, UpdateData, UpdateMessageType, UserChat, VisitorStatus } from '@/types';
import { useSubscribe } from '@/app/hooks/useSubscribe';
import { clearUpdateClientMessage, updateClientMessage } from '@/webSocketActions/updateClientMessage';
import { addClientMessage, clearAddClientMessage } from '@/webSocketActions/addClientMessage';

export const useChat = (chat: UserChat, fetchedMessagesList: Message[]) => {
	const { updateIsRead, addReaction } = useMessageStore(state => ({
		updateIsRead: state.updateIsRead,
		addReaction: state.addReaction,
	}));
	const { userId, chatList } = useCommonStore(state => ({
		userId: state.userId,
		chatList: state.chatList,
	}));

	const [chatMessagesList, setChatMessagesList] = useState<Message[]>(fetchedMessagesList);

	const { push } = useRouter();

	const firstUnreadRef = useRef<string>('');

	const updateMessagesList = useCallback(
		(message: Message) => setChatMessagesList(prevState => [...prevState, message]),
		[]
	);

	const updateMessage = ({
		updateData,
		type,
		roomId: chatId,
	}: {
		updateData: UpdateData;
		type: UpdateMessageType;
		roomId: string;
	}) => {
		if (type === UpdateMessageType.DELETE) {
			const deletedIds = Object.keys(updateData);
			setChatMessagesList(prevState => prevState.filter(el => !deletedIds.includes(el.id)));
		} else {
			setChatMessagesList(prevState =>
				prevState.map(el => {
					if (updateData[el.id]) return updateData[el.id]!;
					return el;
				})
			);
		}
	};

	useSubscribe(updateMessage, updateClientMessage, clearUpdateClientMessage);

	useSubscribe(updateMessagesList, addClientMessage, clearAddClientMessage);

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
		return chatMessagesList.map((message, index) => {
			const isFirstDateMessage =
				!index ||
				(index &&
					new Date(message.createdAt).getDate() !==
						new Date(chatMessagesList[index - 1].createdAt).getDate());
			if (
				!firstUnreadRef.current &&
				message.authorId !== userId &&
				!message.isRead &&
				(chatMessagesList[index - 1]?.isRead || true)
			) {
				firstUnreadRef.current = message.id;
			}
			return {
				...message,
				...(isFirstDateMessage ? { isFirstDateMessage: true } : {}),
			};
		});
	}, [chatMessagesList, userId]);

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
