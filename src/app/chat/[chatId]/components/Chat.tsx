'use client';
import { ChangeEvent, SyntheticEvent, useState } from 'react';
import { ChatWrapper, CoverWrapper, SendMessageForm, SendMessageFormWrapper } from '@/app/chat/[chatId]/styled';
import { StyledInput } from '@/app/chat/styled';
import { Box, InputAdornment } from '@mui/material';
import { addMessageToChat } from '@/actions/addMessageToChat';
import { sendMessageToServer } from '@/utils/sendMessageToServer';
import { ChatHeader } from '@/app/chat/[chatId]/components/ChatHeader';
import { Emoji } from '@/app/chat/[chatId]/components/Emoji';
import { EmojiClickData } from 'emoji-picker-react';
import { ChatProps, Message, MessageType } from '@/types';
import { SingleMessage } from '@/app/chat/[chatId]/components/SingleMessage';
import { useChat } from '@/app/chat/[chatId]/hooks/useChat';
import { addReactionToMessage } from '@/actions/addReactionToMessage';
import { sendEditMessage } from '@/utils/sendEditMessage';
import { ContextMenu } from '@/app/chat/[chatId]/components/ContextMenu';
import { useMenuTransition } from '@/app/chat/[chatId]/hooks/useMenuTransition';
import { deleteSingleMessage } from '@/actions/deleteSingleMessage';
import { ConfirmDialog } from '@/app/chat/[chatId]/components/ConfirmDialog';
import { RepliedMessageBox } from '@/app/chat/[chatId]/components/RepliedMessageBox';

export const Chat = ({ chat }: ChatProps) => {
	const {
		messageList,
		addReaction,
		interlocutorName,
		interlocutorImageUrl,
		userId,
		chatId,
		interlocutorId,
		authorName,
	} = useChat(chat);

	const [repliedMessage, setRepliedMessage] = useState<Message | null>(null);
	const [dialogOpen, setDialogOpen] = useState<boolean>(false);
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
			authorName,
			messageType,
			messageText,
			messageImageUrl,
			replyToId: repliedMessage?.id,
		});
		if (message) sendMessageToServer(message, chatId);
		setMessageType(MessageType.TEXT);
		setRepliedMessage(null);
	};

	const contextMenuToggleHandler = (id: string) => (type: 'open' | 'close', messageParams: DOMRect) => {
		setMessageParams(messageParams);
		setMenuActiveId(type === 'open' ? id : '');
	};

	const closeMenuHandler = () => setMenuActiveId('');

	const onAddEmoji = (data: EmojiClickData) => {
		if (!messageText) {
			setMessageType(MessageType.EMOJI);
			setMessageImageUrl(data.imageUrl);
		}
		setMessageText(prevState => `${prevState} ${data.emoji}`);
	};

	const getMessage = () => messageList.find(el => el.id === menuActiveId);

	const addReactionHandler = async (reactionString: string) => {
		const message = getMessage();
		if (!message) return;
		const reaction = message.reaction === reactionString ? '' : reactionString;
		addReaction(message.id, reaction);
		const updated = (await addReactionToMessage(message.id, reaction)) || message;
		sendEditMessage({ messageId: message.id, message: updated, roomId: chatId });
		setMenuActiveId('');
	};
	const cancelDeleteHandler = () => setDialogOpen(false);
	const deleteMessageHandler = (informBoth: boolean) => async () => {
		sendEditMessage({ messageId: menuActiveId, message: null, roomId: chatId, authorOnly: !informBoth });
		if (informBoth) await deleteSingleMessage(menuActiveId, chatId);
		cancelDeleteHandler();
		setMenuActiveId('');
	};

	const onDeleteMessage = (evt: SyntheticEvent) => {
		evt.stopPropagation();
		setDialogOpen(true);
	};

	const onReplyMessage = () => {
		const message = getMessage();
		if (message) setRepliedMessage(message);
	};

	const dropReplyHandler = () => setRepliedMessage(null);

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
							/>
						);
					})}
				</ChatWrapper>
				{!!menuActiveId && (
					<ContextMenu
						onAddReaction={addReactionHandler}
						closeContextMenu={closeMenuHandler}
						initMenuParams={initMenuParams}
						onDeleteMessage={onDeleteMessage}
						onReplyMessage={onReplyMessage}
						menuTop={menuTop}
					/>
				)}
			</CoverWrapper>
			<SendMessageFormWrapper>
				<RepliedMessageBox message={repliedMessage} authorName={authorName} onDropMessage={dropReplyHandler} />
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
			<ConfirmDialog
				open={dialogOpen}
				onCancel={cancelDeleteHandler}
				onConfirm={deleteMessageHandler}
				interlocutorName={interlocutorName}
			/>
		</Box>
	);
};
