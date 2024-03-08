import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useCommonStore, useDraftMessageStore } from '@/store';
import { useSendTyping } from '@/app/chat-list/[chatId]/hooks/useSendTyping';
import { useFileUpload } from '@/app/shared/hooks/useFileUpload';
import { useLatest } from '@/app/chat-list/[chatId]/hooks/useLatest';
import { RepliedMessageBox } from '@/app/chat-list/[chatId]/components/RepliedMessageBox/RepliedMessageBox';
import { sendMessageToServer } from '@/webSocketActions/sendMessageToServer';
import { ImagePreviewModal } from '@/app/chat-list/[chatId]/components/ImagePreviewModal/ImagePreviewModal';
import { TextAreaEndDecorator } from '@/app/chat-list/[chatId]/components/TextAreaEndDecorator/TextAreaEndDecorator';
import { TextAreaStartDecorator } from '@/app/chat-list/[chatId]/components/TextAreaStartDecorator/TextAreaStartDecorator';
import { sendEditMessage } from '@/webSocketActions/sendEditMessage';
import { CameraMode } from '@/app/chat-list/[chatId]/components/CameraMode/CameraMode';
import { DIALOG_MARGINS } from '@/app/chat-list/[chatId]/constants';
import { createMessage } from '@/prismaActions/createMessage';
import { updateMessage } from '@/prismaActions/updateMessage';
import { TextArea } from '@/app/chat-list/[chatId]/components/TextArea/TextArea';
import { Message, MessageInputProps, MessageType, UpdateMessageType } from '@/types';
import styles from './MessageInput.module.css';

export const MessageInput = ({
	chatId,
	authorName,
	repliedMessage,
	editedMessage,
	setEditedMessage,
	setRepliedMessage,
	interlocutorId,
}: MessageInputProps) => {
	const userId = useCommonStore(state => state.userId);

	const { addDraft, removeDraft, draftMap } = useDraftMessageStore(state => ({
		addDraft: state.addDraft,
		removeDraft: state.removeDraft,
		draftMap: state.draftMap,
	}));

	const [messageText, setMessageText] = useState<string>(draftMap[chatId] || '');
	const [emojis, setEmojis] = useState<string>('');
	const [isImagePreviewModalOpen, setIsImagePreviewModalOpen] = useState<boolean>(false);
	const [isCameraOn, setIsCameraOn] = useState<boolean>(false);

	const messageTextRef = useLatest(messageText);

	const {
		imageUrl: messageImageUrl,
		setImageUrl: setMessageImageUrl,
		dropImageUrl: dropMessageImageUrl,
		selectFileHandler,
	} = useFileUpload();

	useSendTyping(interlocutorId, messageText);

	useEffect(() => {
		setMessageText(draftMap[chatId] || '');
	}, [chatId, draftMap]);

	useEffect(() => {
		if (!editedMessage) return;
		setMessageImageUrl(editedMessage.imageUrl || '');
		setMessageText(editedMessage.text || '');
		if (editedMessage.type === MessageType.EMOJI) setEmojis(editedMessage.text || '');
	}, [setMessageImageUrl, editedMessage]);

	useEffect(
		() => () => {
			if (messageTextRef.current) addDraft(messageTextRef.current, chatId);
		},
		[addDraft, chatId, messageTextRef, removeDraft]
	);

	const textChangeHandler = useCallback(
		(evt: ChangeEvent<HTMLTextAreaElement>) => {
			const { value } = evt.target;
			setMessageText(value);
			if (!value) removeDraft(chatId);
			if (emojis) setEmojis(value);
			if (editedMessage?.type === MessageType.EMOJI) setEmojis(value);
		},
		[chatId, editedMessage?.type, emojis, removeDraft]
	);

	const resetState = useCallback(() => {
		setMessageText('');
		setMessageImageUrl('');
		setEmojis('');
		setRepliedMessage(null);
		setEditedMessage(null);
		removeDraft(chatId);
	}, [chatId, removeDraft, setEditedMessage, setMessageImageUrl, setRepliedMessage]);

	const submitHandler = useCallback(async () => {
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
				updateData: [saved],
				type: UpdateMessageType.EDIT,
				roomId: chatId,
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
	}, [
		authorName,
		chatId,
		editedMessage,
		emojis,
		messageImageUrl,
		messageText,
		repliedMessage?.id,
		resetState,
		userId,
	]);

	const emojiHandler = (reaction: string) => () => {
		const nextEmoji = String.fromCodePoint(parseInt(reaction, 16));
		setMessageText(prevState => `${prevState} ${nextEmoji}`);
		setEmojis(prevState => `${prevState} ${nextEmoji}`);
	};

	const dropReplyHandler = useCallback(() => setRepliedMessage(null), [setRepliedMessage]);

	const openPreviewModalHandler = useCallback(() => {
		if (!messageImageUrl) return;
		setIsImagePreviewModalOpen(true);
	}, [messageImageUrl]);

	const closePhotoModalHandler = useCallback(() => setIsCameraOn(false), []);

	if (isCameraOn) {
		return <CameraMode isOpen={isCameraOn} onClose={closePhotoModalHandler} onTakePhoto={setMessageImageUrl} />;
	}

	return isImagePreviewModalOpen ? (
		<ImagePreviewModal
			src={messageImageUrl}
			onClose={() => setIsImagePreviewModalOpen(false)}
			open={isImagePreviewModalOpen}
			width={window.innerWidth - DIALOG_MARGINS}
		/>
	) : (
		<div className={styles.messageInputContainer}>
			{repliedMessage && (
				<RepliedMessageBox message={repliedMessage} authorName={authorName} onDropMessage={dropReplyHandler} />
			)}
			<TextArea
				value={messageText}
				onChange={textChangeHandler}
				maxRows={2}
				minRows={1}
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
			/>
		</div>
	);
};
