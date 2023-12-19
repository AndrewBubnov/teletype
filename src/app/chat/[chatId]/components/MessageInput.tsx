import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { RepliedMessageBox } from '@/app/chat/[chatId]/components/RepliedMessageBox';
import {
	SendButton,
	SendMessageFormWrapper,
	SendMessageIcon,
	SendWrapper,
	UploadFileIcon,
	UploadLabel,
} from '@/app/chat/[chatId]/styled';
import { StyledInput } from '@/app/chat/styled';
import { InputAdornment } from '@mui/material';
import { Emoji } from '@/app/chat/[chatId]/components/Emoji';
import { Message, MessageType } from '@/types';
import { addMessageToChat } from '@/actions/addMessageToChat';
import { sendMessageToServer } from '@/utils/sendMessageToServer';
import { EmojiClickData } from 'emoji-picker-react';
import { fileInputHelper } from '@/app/chat/[chatId]/utils/fileInputHelper';

interface MessageInputProps {
	chatId: string;
	authorName: string;
	repliedMessage: Message | null;
	setRepliedMessage: Dispatch<SetStateAction<Message | null>>;
}

export const MessageInput = ({ chatId, authorName, repliedMessage, setRepliedMessage }: MessageInputProps) => {
	const { user } = useUser();
	const userId = user?.id as string;

	const [messageImageUrl, setMessageImageUrl] = useState<string>('');
	const [messageText, setMessageText] = useState<string>('');
	const [messageType, setMessageType] = useState<MessageType | null>(null);

	const textChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => setMessageText(evt.target.value);

	const resetState = () => {
		setMessageText('');
		setMessageImageUrl('');
		setMessageType(null);
		setRepliedMessage(null);
	};

	const textSubmitHandler = async () => {
		const type = messageType ? messageType : messageImageUrl ? MessageType.IMAGE : MessageType.TEXT;
		const message = await addMessageToChat({
			chatId,
			authorId: userId,
			authorName,
			messageType: type,
			messageText,
			messageImageUrl,
			replyToId: repliedMessage?.id,
		});
		if (message) sendMessageToServer(message, chatId);
		resetState();
	};

	const onAddEmoji = (data: EmojiClickData) => {
		setMessageType(MessageType.EMOJI);
		setMessageText(prevState => `${prevState} ${data.emoji}`);
	};
	const dropReplyHandler = () => setRepliedMessage(null);

	const createImage = async (messageImageUrl: string) => {
		const message = await addMessageToChat({
			chatId,
			authorId: userId,
			authorName,
			messageText,
			messageType: MessageType.IMAGE,
			messageImageUrl,
			replyToId: repliedMessage?.id,
		});
		if (message) sendMessageToServer(message, chatId);
		resetState();
	};

	const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => fileInputHelper(event, createImage);

	return (
		<SendMessageFormWrapper>
			<RepliedMessageBox message={repliedMessage} authorName={authorName} onDropMessage={dropReplyHandler} />
			<SendWrapper>
				<StyledInput
					onInput={() => setMessageType(MessageType.TEXT)}
					fullWidth
					value={messageText}
					onChange={textChangeHandler}
					label="Type here.."
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								(
								<UploadLabel htmlFor="formId">
									<UploadFileIcon />
									<input id="formId" type="file" onChange={handleFileSelect} hidden />
								</UploadLabel>
								)
								<Emoji onAddEmoji={onAddEmoji} />
							</InputAdornment>
						),
					}}
				/>
				<SendButton onClick={textSubmitHandler} endIcon={<SendMessageIcon />} />
			</SendWrapper>
		</SendMessageFormWrapper>
	);
};
