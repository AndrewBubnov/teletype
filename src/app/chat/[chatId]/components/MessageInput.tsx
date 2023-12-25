import { ChangeEvent, useLayoutEffect, useRef, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { Textarea } from '@mui/joy';
import { RepliedMessageBox } from '@/app/chat/[chatId]/components/RepliedMessageBox';
import { SendMessageFormWrapper, SendWrapper } from '@/app/chat/[chatId]/styled';
import { addMessageToChat } from '@/actions/addMessageToChat';
import { sendMessageToServer } from '@/utils/sendMessageToServer';
import { fileInputHelper } from '@/app/chat/[chatId]/utils/fileInputHelper';
import { DIALOG_MARGINS, TEXT_AREA_STYLE } from '@/app/chat/[chatId]/constants';
import { ImagePreviewModal } from '@/app/chat/[chatId]/components/ImagePreviewModal';
import { MessageInputProps, MessageType } from '@/types';
import { TextAreaEndDecorator } from '@/app/chat/[chatId]/components/TextAreaEndDecorator';
import { TextAreaStartDecorator } from '@/app/chat/[chatId]/components/TextAreaStartDecorator';

export const MessageInput = ({ chatId, authorName, repliedMessage, setRepliedMessage }: MessageInputProps) => {
	const { user } = useUser();
	const userId = user?.id as string;

	const [messageImageUrl, setMessageImageUrl] = useState<string>('');
	const [messageText, setMessageText] = useState<string>('');
	const [emoji, setEmoji] = useState<string>('');
	const [isImagePreviewModalOpen, setIsImagePreviewModalOpen] = useState<boolean>(false);

	const ref = useRef<HTMLDivElement>(null);
	const widthRef = useRef<number>(0);

	useLayoutEffect(() => {
		if (!ref.current) return;
		widthRef.current = ref.current.clientWidth - DIALOG_MARGINS;
	}, []);

	const textChangeHandler = (evt: ChangeEvent<HTMLTextAreaElement>) => setMessageText(evt.target.value);

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

	const emojiHandler = (reaction: string) => () => {
		setMessageText(prevState => `${prevState} ${String.fromCodePoint(parseInt(reaction, 16))}`);
		setEmoji(prevState => `${prevState} ${String.fromCodePoint(parseInt(reaction, 16))}`);
	};
	const dropReplyHandler = () => setRepliedMessage(null);

	const createPreview = (imgUrl: string) => setMessageImageUrl(imgUrl);

	const selectFileHandler = (event: ChangeEvent<HTMLInputElement>) => fileInputHelper(event, createPreview);

	const dropMessageImageUrl = () => setMessageImageUrl('');

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
							openPreviewModal={() => setIsImagePreviewModalOpen(true)}
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
