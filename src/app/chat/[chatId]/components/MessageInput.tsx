import { ChangeEvent, useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { Textarea } from '@mui/joy';
import { RepliedMessageBox } from '@/app/chat/[chatId]/components/RepliedMessageBox';
import { SendMessageFormWrapper } from '@/app/chat/[chatId]/styled';
import { sendMessageToServer } from '@/utils/sendMessageToServer';
import { ImagePreviewModal } from '@/app/chat/[chatId]/components/ImagePreviewModal';
import { TextAreaEndDecorator } from '@/app/chat/[chatId]/components/TextAreaEndDecorator';
import { TextAreaStartDecorator } from '@/app/chat/[chatId]/components/TextAreaStartDecorator';
import { sendEditMessage } from '@/utils/sendEditMessage';
import { CameraMode } from '@/app/chat/[chatId]/components/CameraMode';
import { useFileUpload } from '@/app/shared/hooks/useFileUpload';
import { DIALOG_MARGINS, TEXT_AREA_STYLE } from '@/app/chat/[chatId]/constants';
import { createMessage } from '@/actions/createMessage';
import { Message, MessageInputProps, MessageType } from '@/types';
import { updateMessage } from '@/actions/updateMessage';

export const MessageInput = ({
	chatId,
	authorName,
	repliedMessage,
	editedMessage,
	setEditedMessage,
	setRepliedMessage,
}: MessageInputProps) => {
	const { user } = useUser();
	const userId = user?.id as string;

	const [messageText, setMessageText] = useState<string>('');
	const [emojis, setEmojis] = useState<string>('');
	const [isImagePreviewModalOpen, setIsImagePreviewModalOpen] = useState<boolean>(false);
	const [isCameraOn, setIsCameraOn] = useState<boolean>(false);

	const {
		imageUrl: messageImageUrl,
		setImageUrl: setMessageImageUrl,
		dropImageUrl: dropMessageImageUrl,
		selectFileHandler,
	} = useFileUpload();

	useEffect(() => {
		if (!editedMessage) return;
		setMessageImageUrl(editedMessage.imageUrl || '');
		setMessageText(editedMessage.text || '');
		if (editedMessage.type === MessageType.EMOJI) setEmojis(editedMessage.text || '');
	}, [setMessageImageUrl, editedMessage]);

	const textChangeHandler = (evt: ChangeEvent<HTMLTextAreaElement>) => {
		setMessageText(evt.target.value);
		if (emojis) setEmojis(evt.target.value);
		if (editedMessage?.type === MessageType.EMOJI) setEmojis(evt.target.value);
	};

	const resetState = () => {
		setMessageText('');
		setMessageImageUrl('');
		setEmojis('');
		setRepliedMessage(null);
		setEditedMessage(null);
	};

	const submitHandler = async () => {
		if (!messageText && !messageImageUrl) return;
		const type = messageText && emojis && messageText === emojis ? MessageType.EMOJI : MessageType.COMMON;

		if (editedMessage) {
			const updated = {
				chatId,
				authorId: userId,
				authorName,
				type,
				text: messageText,
				imageUrl: messageImageUrl,
				replyToId: repliedMessage?.id,
			};
			const saved = (await updateMessage(editedMessage.id, updated)) as Message;
			sendEditMessage({
				messageId: editedMessage.id,
				message: saved,
				roomId: chatId,
				authorOnly: false,
			});
		} else {
			const message = await createMessage({
				chatId,
				authorId: userId,
				authorName,
				type,
				text: messageText,
				imageUrl: messageImageUrl,
				replyToId: repliedMessage?.id,
			});
			if (message) sendMessageToServer(message, chatId);
		}
		resetState();
	};

	const emojiHandler = (reaction: string) => () => {
		const nextEmoji = String.fromCodePoint(parseInt(reaction, 16));
		setMessageText(prevState => `${prevState} ${nextEmoji}`);
		setEmojis(prevState => `${prevState} ${nextEmoji}`);
	};
	const dropReplyHandler = () => setRepliedMessage(null);

	const openPreviewModalHandler = () => {
		if (!messageImageUrl) return;
		setIsImagePreviewModalOpen(true);
	};

	const closePhotoModalHandler = (_?: {}, reason?: string) => {
		if (reason !== 'backdropClick') setIsCameraOn(false);
	};

	if (isCameraOn) {
		return <CameraMode open={isCameraOn} onClose={closePhotoModalHandler} onTakePhoto={setMessageImageUrl} />;
	}

	return isImagePreviewModalOpen ? (
		<ImagePreviewModal
			src={messageImageUrl}
			onClose={() => setIsImagePreviewModalOpen(false)}
			open={isImagePreviewModalOpen}
			width={window.innerWidth - DIALOG_MARGINS}
		/>
	) : (
		<SendMessageFormWrapper>
			<RepliedMessageBox message={repliedMessage} authorName={authorName} onDropMessage={dropReplyHandler} />
			<Textarea
				placeholder="Type in here…"
				value={messageText}
				onChange={textChangeHandler}
				minRows={1}
				maxRows={2}
				startDecorator={<TextAreaStartDecorator emojiHandler={emojiHandler} />}
				endDecorator={
					<TextAreaEndDecorator
						messageImageUrl={messageImageUrl}
						onDropImageUrl={dropMessageImageUrl}
						openPreviewModal={openPreviewModalHandler}
						onSelectFile={selectFileHandler}
						onCameraStart={() => setIsCameraOn(true)}
						onSubmit={submitHandler}
					/>
				}
				sx={TEXT_AREA_STYLE}
			/>
		</SendMessageFormWrapper>
	);
};
