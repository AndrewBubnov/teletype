import { ChangeEvent, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import { EmojiClickData } from 'emoji-picker-react';
import { RepliedMessageBox } from '@/app/chat/[chatId]/components/RepliedMessageBox';
import {
	PreviewWrapper,
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
import { addMessageToChat } from '@/actions/addMessageToChat';
import { sendMessageToServer } from '@/utils/sendMessageToServer';
import { fileInputHelper } from '@/app/chat/[chatId]/utils/fileInputHelper';
import { MessageInputProps, MessageType } from '@/types';

export const MessageInput = ({ chatId, authorName, repliedMessage, setRepliedMessage }: MessageInputProps) => {
	const { user } = useUser();
	const userId = user?.id as string;

	const [messageImageUrl, setMessageImageUrl] = useState<string>('');
	const [messageText, setMessageText] = useState<string>('');
	const [emoji, setEmoji] = useState<string>('');

	const textChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => setMessageText(evt.target.value);

	const resetState = () => {
		setMessageText('');
		setMessageImageUrl('');
		setEmoji('');
		setRepliedMessage(null);
	};

	const submitHandler = async () => {
		const type = messageText && emoji && messageText === emoji ? MessageType.EMOJI : MessageType.COMMON;
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
		setMessageText(prevState => `${prevState} ${data.emoji}`);
		setEmoji(prevState => `${prevState} ${data.emoji}`);
	};
	const dropReplyHandler = () => setRepliedMessage(null);

	const createPreview = (imgUrl: string) => setMessageImageUrl(imgUrl);

	const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => fileInputHelper(event, createPreview);

	const dropMessageImageUrl = () => setMessageImageUrl('');

	return (
		<SendMessageFormWrapper>
			<RepliedMessageBox message={repliedMessage} authorName={authorName} onDropMessage={dropReplyHandler} />
			<SendWrapper>
				<StyledInput
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
				{messageImageUrl ? (
					<PreviewWrapper onClick={dropMessageImageUrl}>
						<Image src={messageImageUrl} alt="preview" fill />
					</PreviewWrapper>
				) : null}
				<SendButton onClick={submitHandler} endIcon={<SendMessageIcon />} />
			</SendWrapper>
		</SendMessageFormWrapper>
	);
};
