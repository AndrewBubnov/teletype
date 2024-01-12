'use client';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useChat } from '@/app/chat/[chatId]/hooks/useChat';
import { useMenuTransition } from '@/app/chat/[chatId]/hooks/useMenuTransition';
import { ChatWrapper, CoverWrapper } from '@/app/chat/[chatId]/styled';
import { LoaderWrapper, LoadingIndicator } from '@/app/shared/styled';
import { Box } from '@mui/material';
import { ChatHeader } from '@/app/chat/[chatId]/components/ChatHeader';
import { SingleMessage } from '@/app/chat/[chatId]/components/SingleMessage';
import { sendEditMessage } from '@/utils/sendEditMessage';
import { ContextMenu } from '@/app/chat/[chatId]/components/ContextMenu';
import { MessageInput } from '@/app/chat/[chatId]/components/MessageInput';
import { UnreadMessages } from '@/app/chat/[chatId]/components/UnreadMessages';
import { deleteMessage } from '@/actions/deleteMessage';
import { ChatProps, Message } from '@/types';
export const Chat = ({ chat }: ChatProps) => {
	const {
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
	} = useChat(chat);
	const [repliedMessage, setRepliedMessage] = useState<Message | null>(null);
	const [editedMessage, setEditedMessage] = useState<Message | null>(null);
	const [menuActiveId, setMenuActiveId] = useState<string>('');

	const { menuTop, setMessageParams, containerRef, initMenuParams } = useMenuTransition(menuActiveId);

	const unreadRef = useRef(unreadNumber);

	useEffect(() => {
		if (!unreadNumber) {
			unreadRef.current = 0;
		}
	}, [unreadNumber]);

	const contextMenuToggleHandler = (id: string) => (type: 'open' | 'close', messageParams: DOMRect) => {
		setMessageParams(messageParams);
		setMenuActiveId(type === 'open' ? id : '');
	};

	const closeMenuHandler = useCallback(() => setMenuActiveId(''), []);

	const activeMessage = useMemo(() => messageList.find(el => el.id === menuActiveId), [menuActiveId, messageList]);

	const addReactionHandler = useCallback(
		async (reactionString: string) => {
			if (!activeMessage) return;
			const reaction = activeMessage.reaction === reactionString ? '' : reactionString;
			await addReaction(activeMessage.id, reaction);
			closeMenuHandler();
		},
		[addReaction, closeMenuHandler, activeMessage]
	);

	const onDeleteMessage = useCallback(
		async (informBoth: boolean) => {
			const updated = await deleteMessage(menuActiveId, [userId, ...(informBoth ? [interlocutorId] : [])]);

			if (informBoth) {
				sendEditMessage({
					messageId: menuActiveId,
					message: null,
					roomId: chatId,
				});
			} else if (updated) {
				sendEditMessage({
					messageId: menuActiveId,
					message: updated,
					roomId: chatId,
				});
			}
			setMenuActiveId('');
		},
		[menuActiveId, chatId, userId, interlocutorId]
	);

	const onReplyMessage = useCallback(() => {
		if (activeMessage) setRepliedMessage(activeMessage);
	}, [activeMessage]);

	const onEditMessage = useCallback(() => {
		if (activeMessage) setEditedMessage(activeMessage);
	}, [activeMessage]);

	const onDownLoadImage = useCallback(() => {
		if (!activeMessage) return;
		if (activeMessage.imageUrl) {
			const link = document.createElement('a');
			link.download = 'image.jpg';
			link.href = activeMessage.imageUrl;
			link.click();
		}
		setMenuActiveId('');
	}, [activeMessage]);

	const scrollToLastHandler = useCallback(() => {
		const id = messageList.at(-1)?.id;
		if (!id) return;
		const node = document.getElementById(id);
		node?.scrollIntoView({ behavior: 'smooth' });
	}, [messageList]);

	if (!userId)
		return (
			<LoaderWrapper>
				<LoadingIndicator />
			</LoaderWrapper>
		);

	return (
		<Box>
			<ChatHeader
				chatId={chatId}
				interlocutorName={interlocutorName}
				interlocutorImageUrl={interlocutorImageUrl}
				interlocutorId={interlocutorId}
			/>
			<CoverWrapper>
				<ChatWrapper ref={containerRef}>
					{messageList
						.filter(el => !el.hidden.includes(userId))
						.map((message, index, { length }) => {
							const repliedMessage = message.replyToId
								? messageList.find(el => el.id === message.replyToId)
								: null;
							return (
								<SingleMessage
									key={message.id}
									message={message}
									repliedMessage={repliedMessage}
									isAuthoredByUser={message.authorId === userId}
									isScrolledTo={index === length - 1 - unreadRef.current}
									onContextMenuToggle={contextMenuToggleHandler(message.id)}
									updateIsRead={message.authorId !== userId ? updateIsRead : null}
								/>
							);
						})}
				</ChatWrapper>
				{!!activeMessage && (
					<ContextMenu
						onCloseMenu={closeMenuHandler}
						onReplyMessage={onReplyMessage}
						onEditMessage={onEditMessage}
						onDeleteMessage={onDeleteMessage}
						onAddReaction={addReactionHandler}
						onDownLoadImage={activeMessage.imageUrl ? onDownLoadImage : null}
						menuTop={menuTop}
						initMenuParams={initMenuParams}
						interlocutorName={interlocutorName}
						isAuthor={activeMessage.authorId === authorId}
					/>
				)}
				{unreadNumber ? <UnreadMessages unreadNumber={unreadNumber} onPress={scrollToLastHandler} /> : null}
			</CoverWrapper>
			<MessageInput
				chatId={chatId}
				authorName={authorName}
				repliedMessage={repliedMessage}
				setRepliedMessage={setRepliedMessage}
				editedMessage={editedMessage}
				setEditedMessage={setEditedMessage}
			/>
		</Box>
	);
};
