import { ChangeEvent, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { Textarea } from '@mui/joy';
import { RepliedMessageBox } from '@/app/chat/[chatId]/components/RepliedMessageBox';
import { SendMessageFormWrapper, SendWrapper } from '@/app/chat/[chatId]/styled';
import { addMessageToChat } from '@/actions/addMessageToChat';
import { sendMessageToServer } from '@/utils/sendMessageToServer';
import { fileInputHelper } from '@/app/chat/[chatId]/utils/fileInputHelper';
import { ImagePreviewModal } from '@/app/chat/[chatId]/components/ImagePreviewModal';
import { TextAreaEndDecorator } from '@/app/chat/[chatId]/components/TextAreaEndDecorator';
import { TextAreaStartDecorator } from '@/app/chat/[chatId]/components/TextAreaStartDecorator';
import { updateMessage } from '@/actions/updateMessage';
import { DIALOG_MARGINS, MAX_FILE_SIZE, TEXT_AREA_STYLE } from '@/app/chat/[chatId]/constants';
import { MessageInputProps, MessageType } from '@/types';
import { sendEditMessage } from '@/utils/sendEditMessage';
import { useStore } from '@/store';

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

	const setErrorMessage = useStore(state => state.setErrorMessage);

	const [messageImageUrl, setMessageImageUrl] = useState<string>('');
	const [messageText, setMessageText] = useState<string>('');
	const [emojis, setEmojis] = useState<string>('');
	const [isImagePreviewModalOpen, setIsImagePreviewModalOpen] = useState<boolean>(false);

	const ref = useRef<HTMLDivElement>(null);
	const widthRef = useRef<number>(0);

	useLayoutEffect(() => {
		if (!ref.current) return;
		widthRef.current = ref.current.clientWidth - DIALOG_MARGINS;
	}, []);

	useEffect(() => {
		if (!editedMessage) return;
		setMessageImageUrl(editedMessage.imageUrl || '');
		setMessageText(editedMessage.text || '');
		if (editedMessage.type === MessageType.EMOJI) setEmojis(editedMessage.text || '');
	}, [editedMessage]);

	const textChangeHandler = (evt: ChangeEvent<HTMLTextAreaElement>) => {
		setMessageText(evt.target.value);
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
		const type = messageText && emojis && messageText === emojis ? MessageType.EMOJI : MessageType.COMMON;
		const commonArgs = {
			chatId,
			authorId: userId,
			authorName,
			messageType: type,
			messageText,
			messageImageUrl,
			replyToId: repliedMessage?.id,
		};
		const message = editedMessage
			? await updateMessage({
					...commonArgs,
					id: editedMessage.id,
				})
			: await addMessageToChat(commonArgs);
		if (message && editedMessage)
			sendEditMessage({
				messageId: message.id,
				message,
				roomId: chatId,
				authorOnly: false,
			});
		if (message && !editedMessage) sendMessageToServer(message, chatId);
		resetState();
	};

	const emojiHandler = (reaction: string) => () => {
		const nextEmoji = String.fromCodePoint(parseInt(reaction, 16));
		setMessageText(prevState => `${prevState} ${nextEmoji}`);
		setEmojis(prevState => `${prevState} ${nextEmoji}`);
	};
	const dropReplyHandler = () => setRepliedMessage(null);

	const createPreview = (imgUrl: string) => setMessageImageUrl(imgUrl);

	const selectFileHandler = (event: ChangeEvent<HTMLInputElement>) => {
		if ((event.target.files?.[0].size || 0) > MAX_FILE_SIZE) {
			setErrorMessage('Max file size of 700Kb exceeded');
			event.target.value = '';
			return;
		}
		fileInputHelper(event, createPreview);
	};

	const dropMessageImageUrl = () => setMessageImageUrl('');

	const openPreviewModalHandler = () => {
		if (!messageImageUrl) return;
		setIsImagePreviewModalOpen(true);
	};

	return isImagePreviewModalOpen ? (
		<ImagePreviewModal
			src={messageImageUrl}
			onClose={() => setIsImagePreviewModalOpen(false)}
			open={isImagePreviewModalOpen}
			width={widthRef.current}
		/>
	) : (
		<SendMessageFormWrapper ref={ref}>
			<RepliedMessageBox message={repliedMessage} authorName={authorName} onDropMessage={dropReplyHandler} />
			<SendWrapper>
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
							onSubmit={submitHandler}
						/>
					}
					sx={TEXT_AREA_STYLE}
				/>
			</SendWrapper>
		</SendMessageFormWrapper>
	);
};
