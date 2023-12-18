'use client';
import { useCallback, useState } from 'react';
import { useChat } from '@/app/chat/[chatId]/hooks/useChat';
import { useMenuTransition } from '@/app/chat/[chatId]/hooks/useMenuTransition';
import { ChatWrapper, CoverWrapper } from '@/app/chat/[chatId]/styled';
import { Box } from '@mui/material';
import { ChatHeader } from '@/app/chat/[chatId]/components/ChatHeader';
import { SingleMessage } from '@/app/chat/[chatId]/components/SingleMessage';
import { addReactionToMessage } from '@/actions/addReactionToMessage';
import { sendEditMessage } from '@/utils/sendEditMessage';
import { ContextMenu } from '@/app/chat/[chatId]/components/ContextMenu';
import { MessageInput } from '@/app/chat/[chatId]/components/MessageInput';
import { ChatProps, Message } from '@/types';
import { ScrollToBottomButton } from '@/app/chat/[chatId]/components/ScrollToBottomButton';

export const Chat = ({ chat }: ChatProps) => {
	const {
		messageList,
		addReaction,
		interlocutorName,
		interlocutorImageUrl,
		chatId,
		interlocutorId,
		authorName,
		unreadNumber,
		updateIsRead,
	} = useChat(chat);
	const [repliedMessage, setRepliedMessage] = useState<Message | null>(null);
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
			const updated = (await addReactionToMessage(message.id, reaction)) || message;
			sendEditMessage({ messageId: message.id, message: { ...updated, isRead: true }, roomId: chatId });
			closeMenuHandler();
		},
		[addReaction, chatId, closeMenuHandler, getMessage]
	);

	const onReplyMessage = useCallback(() => {
		const message = getMessage();
		if (message) setRepliedMessage(message);
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
								updateIsRead={updateIsRead}
							/>
						);
					})}
				</ChatWrapper>
				{!!menuActiveId && (
					<ContextMenu
						closeContextMenu={closeMenuHandler}
						initMenuParams={initMenuParams}
						onReplyMessage={onReplyMessage}
						menuTop={menuTop}
						menuActiveId={menuActiveId}
						onAddReaction={addReactionHandler}
						chatId={chatId}
						interlocutorName={interlocutorName}
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
			/>
		</Box>
	);
};
