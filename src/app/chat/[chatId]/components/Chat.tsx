'use client';
import { ChangeEvent, useState } from 'react';
import { ChatWrapper, CoverWrapper, SendMessageForm, SendMessageFormWrapper } from '@/app/chat/[chatId]/styled';
import { StyledInput } from '@/app/chat/styled';
import { Box, InputAdornment } from '@mui/material';
import { addMessageToChat } from '@/actions/addMessageToChat';
import { sendMessageToServer } from '@/utils/sendMessageToServer';
import { ChatHeader } from '@/app/chat/[chatId]/components/ChatHeader';
import { Emoji } from '@/app/chat/[chatId]/components/Emoji';
import { EmojiClickData } from 'emoji-picker-react';
import { ChatProps, MessageType } from '@/types';
import { SingleMessage } from '@/app/chat/[chatId]/components/SingleMessage';
import { useChat } from '@/app/chat/[chatId]/hooks/useChat';
import { addReactionToMessage } from '@/actions/addReactionToMessage';
import { sendEditMessage } from '@/utils/sendEditMessage';
import { ContextMenu } from '@/app/chat/[chatId]/components/ContextMenu';
import { useMenuTransition } from '@/app/chat/[chatId]/hooks/useMenuTransition';

export const Chat = ({ chat }: ChatProps) => {
	const { messageList, addReaction, interlocutorName, interlocutorImageUrl, userId, chatId, interlocutorId } =
		useChat(chat);

	const [messageText, setMessageText] = useState<string>('');
	const [messageImageUrl, setMessageImageUrl] = useState<string>('');
	const [menuActiveId, setMenuActiveId] = useState<string>('');
	const [messageType, setMessageType] = useState<MessageType>(MessageType.TEXT);

	const { menuTop, setMessageParams, containerRef, initMenuParams } = useMenuTransition(menuActiveId);

	const changeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
		setMessageText(evt.target.value);
		setMessageImageUrl('');
		setMessageType(MessageType.TEXT);
	};
	const submitHandler = async () => {
		setMessageText('');
		setMessageImageUrl('');
		const message = await addMessageToChat({
			chatId,
			authorId: userId,
			messageType,
			messageText,
			messageImageUrl,
		});
		if (message) sendMessageToServer(message, chatId);
		setMessageType(MessageType.TEXT);
	};

	const contextMenuToggleHandler = (id: string) => (type: 'open' | 'close', messageParams: DOMRect) => {
		setMessageParams(messageParams);
		setMenuActiveId(prevState => {
			if (type === 'open') return prevState ? '' : id;
			return '';
		});
	};

	const closeMenuHandler = () => setMenuActiveId('');

	const onAddEmoji = (data: EmojiClickData) => {
		if (!messageText) {
			setMessageType(MessageType.EMOJI);
			setMessageImageUrl(data.imageUrl);
		}
		setMessageText(prevState => `${prevState} ${data.emoji}`);
	};

	const addReactionHandler = async (reactionString: string) => {
		const message = messageList.find(el => el.id === menuActiveId);
		if (!message) return;
		const reaction = message.reaction === reactionString ? '' : reactionString;
		addReaction(message.id, reaction);
		const updated = (await addReactionToMessage(message.id, reaction)) || message;
		sendEditMessage({ messageId: message.id, message: updated, roomId: chatId });
		setMenuActiveId('');
	};

	return (
		<Box>
			<ChatHeader
				chatId={chatId}
				interlocutorId={interlocutorId}
				interlocutorName={interlocutorName}
				interlocutorImageUrl={interlocutorImageUrl}
			/>
			<CoverWrapper>
				<ChatWrapper ref={containerRef}>
					{messageList.map(message => (
						<SingleMessage
							key={message.id}
							message={message}
							onContextMenuToggle={contextMenuToggleHandler(message.id)}
							menuActive={menuActiveId === message.id}
							onAddReaction={addReactionHandler}
						/>
					))}
				</ChatWrapper>
				{!!menuActiveId && (
					<ContextMenu
						onAddReaction={addReactionHandler}
						closeContextMenu={closeMenuHandler}
						initMenuParams={initMenuParams}
						menuTop={menuTop}
					/>
				)}
			</CoverWrapper>
			<SendMessageFormWrapper>
				<SendMessageForm action={submitHandler}>
					<StyledInput
						fullWidth
						value={messageText}
						onChange={changeHandler}
						label="Type here.."
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<Emoji onAddEmoji={onAddEmoji} />
								</InputAdornment>
							),
						}}
					/>
				</SendMessageForm>
			</SendMessageFormWrapper>
		</Box>
	);
};
