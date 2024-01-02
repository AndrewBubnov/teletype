'use client';
import { useCallback, useState } from 'react';
import { useChat } from '@/app/chat/[chatId]/hooks/useChat';
import { useMenuTransition } from '@/app/chat/[chatId]/hooks/useMenuTransition';
import { ChatWrapper, CoverWrapper } from '@/app/chat/[chatId]/styled';
import { Box } from '@mui/material';
import { ChatHeader } from '@/app/chat/[chatId]/components/ChatHeader';
import { SingleMessage } from '@/app/chat/[chatId]/components/SingleMessage';
import { sendEditMessage } from '@/utils/sendEditMessage';
import { ContextMenu } from '@/app/chat/[chatId]/components/ContextMenu';
import { MessageInput } from '@/app/chat/[chatId]/components/MessageInput';
import { ScrollToBottomButton } from '@/app/chat/[chatId]/components/ScrollToBottomButton';
import { ChatProps, Message } from '@/types';

export const Chat = ({ chat }: ChatProps) => {
	const {
		messageList,
		addReaction,
		interlocutorName,
		interlocutorImageUrl,
		chatId,
		authorId,
		authorImageUrl,
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

	const contextMenuToggleHandler = (id: string) => (type: 'open' | 'close', messageParams: DOMRect) => {
		setMessageParams(messageParams);
		setMenuActiveId(type === 'open' ? id : '');
	};

	const closeMenuHandler = useCallback(() => setMenuActiveId(''), []);

	const getMessage = useCallback(() => messageList.find(el => el.id === menuActiveId), [menuActiveId, messageList]);

	const addReactionHandler = useCallback(
		async (reactionString: string) => {
			const message = getMessage();
			if (!message) return;
			const reaction = message.reaction === reactionString ? '' : reactionString;
			addReaction(message.id, reaction);
			sendEditMessage({
				messageId: message.id,
				message: { ...message, reaction, reactionAuthorImageUrl: authorImageUrl },
				roomId: chatId,
			});
			closeMenuHandler();
		},
		[addReaction, chatId, closeMenuHandler, getMessage, authorImageUrl]
	);

	const onReplyMessage = useCallback(() => {
		const message = getMessage();
		if (message) setRepliedMessage(message);
	}, [getMessage]);

	const onEditMessage = useCallback(() => {
		const message = getMessage();
		if (message) setEditedMessage(message);
	}, [getMessage]);

	const scrollToLastHandler = () => {
		const id = messageList.at(-1)?.id;
		if (!id) return;
		const node = document.getElementById(id);
		node?.scrollIntoView({ behavior: 'smooth' });
	};

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
					{messageList.map(message => {
						const repliedMessage = message.replyToId
							? messageList.find(el => el.id === message.replyToId)
							: null;
						return (
							<SingleMessage
								key={message.id}
								message={message}
								repliedMessage={repliedMessage}
								onContextMenuToggle={contextMenuToggleHandler(message.id)}
								updateIsRead={message.authorId !== userId ? updateIsRead : null}
							/>
						);
					})}
				</ChatWrapper>
				{!!menuActiveId && (
					<ContextMenu
						closeContextMenu={closeMenuHandler}
						initMenuParams={initMenuParams}
						onReplyMessage={onReplyMessage}
						onEditMessage={onEditMessage}
						menuTop={menuTop}
						menuActiveId={menuActiveId}
						onAddReaction={addReactionHandler}
						chatId={chatId}
						interlocutorName={interlocutorName}
						isAuthor={messageList.find(el => el.id === menuActiveId)?.authorId === authorId}
					/>
				)}
				{unreadNumber ? (
					<ScrollToBottomButton unreadNumber={unreadNumber} onPress={scrollToLastHandler} />
				) : null}
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
