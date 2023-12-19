import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { RepliedMessageBox } from '@/app/chat/[chatId]/components/RepliedMessageBox';
import { SendMessageForm, SendMessageFormWrapper, UploadFileIcon, UploadLabel } from '@/app/chat/[chatId]/styled';
import { StyledInput } from '@/app/chat/styled';
import { InputAdornment } from '@mui/material';
import { Emoji } from '@/app/chat/[chatId]/components/Emoji';
import { Message, MessageType } from '@/types';
import { addMessageToChat } from '@/actions/addMessageToChat';
import { sendMessageToServer } from '@/utils/sendMessageToServer';
import { EmojiClickData } from 'emoji-picker-react';

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
	const [messageType, setMessageType] = useState<MessageType>(MessageType.TEXT);

	const changeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
		setMessageText(evt.target.value);
		setMessageImageUrl('');
		setMessageType(MessageType.TEXT);
	};

	const textSubmitHandler = async () => {
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

	const onAddEmoji = (data: EmojiClickData) => {
		if (!messageText) {
			setMessageType(MessageType.EMOJI);
			setMessageImageUrl(data.imageUrl);
		}
		setMessageText(prevState => `${prevState} ${data.emoji}`);
	};
	const dropReplyHandler = () => setRepliedMessage(null);

	const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			const reader = new FileReader();

			reader.onload = async upload => {
				const base64Image: string | ArrayBuffer | null | undefined = upload.target?.result;
				if (typeof base64Image === 'string') {
					const message = await addMessageToChat({
						chatId,
						authorId: userId,
						authorName,
						messageType: MessageType.IMAGE,
						messageImageUrl: base64Image,
						replyToId: repliedMessage?.id,
					});
					if (message) sendMessageToServer(message, chatId);
					setMessageType(MessageType.TEXT);
					setRepliedMessage(null);
				}
			};

			reader.readAsDataURL(file);
		}
	};

	return (
		<SendMessageFormWrapper>
			<RepliedMessageBox message={repliedMessage} authorName={authorName} onDropMessage={dropReplyHandler} />
			<SendMessageForm action={textSubmitHandler}>
				<StyledInput
					fullWidth
					value={messageText}
					onChange={changeHandler}
					label="Type here.."
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								{!messageText ? (
									<UploadLabel htmlFor="formId">
										<UploadFileIcon />
										<input id="formId" type="file" onChange={handleFileSelect} hidden />
									</UploadLabel>
								) : null}
								<Emoji onAddEmoji={onAddEmoji} />
							</InputAdornment>
						),
					}}
				/>
			</SendMessageForm>
		</SendMessageFormWrapper>
	);
};
