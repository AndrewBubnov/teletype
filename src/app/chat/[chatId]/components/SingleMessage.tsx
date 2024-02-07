import { SyntheticEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { SingleMessageWrapper } from '@/app/chat/[chatId]/components/SingleMessageWrapper';
import { EmojiMessage } from '@/app/chat/[chatId]/components/EmojiMessage';
import { ReplyTo } from '@/app/chat/[chatId]/components/ReplyTo';
import { ImageMessage } from '@/app/chat/[chatId]/components/ImageMessage';
import { MessageBottom } from '@/app/chat/[chatId]/components/MessageBottom';
import { LinkMessagePart } from '@/app/chat/[chatId]/components/LinkMessagePart';
import { StyledElement } from '@/app/chat/[chatId]/components/StyledElement';
import { StyledCheckbox } from '@/app/shared/components/StyledCheckbox';
import { urlRegex } from '@/app/chat/[chatId]/constants';
import { MessageType, SingleMessageProps } from '@/types';
import styles from '../chatId.module.css';

export const SingleMessage = ({
	message,
	repliedMessage,
	updateIsRead,
	isScrolledTo,
	isAuthoredByUser,
	isSelectMode,
	isSelected,
	onSelectModeStart,
	firstUnreadId,
	onReplyMessage,
	onEditMessage,
	onAddReaction,
	addSelection,
}: SingleMessageProps) => {
	const [isImageEnlarged, setIsImageEnlarged] = useState<boolean>(false);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (isScrolledTo || isImageEnlarged)
			containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
	}, [isScrolledTo, isImageEnlarged]);

	const messageText = useMemo(() => {
		const text = message.text || '';
		const links = text.match(urlRegex);

		if (!links) return text;

		return text.split(/\s+/).map((part, index) => {
			if (links.includes(part)) return <LinkMessagePart key={index} href={part} />;
			return <span key={index}>{part}&nbsp;</span>;
		});
	}, [message.text]);

	const toggleEnlargeHandler = useCallback((evt: SyntheticEvent) => {
		evt.stopPropagation();
		setIsImageEnlarged(prevState => !prevState);
	}, []);

	if (message.type === MessageType.COMMON) {
		return (
			<SingleMessageWrapper
				message={message}
				isSelectMode={isSelectMode}
				onReplyMessage={onReplyMessage}
				onEditMessage={onEditMessage}
				addSelection={addSelection}
				onSelectModeStart={onSelectModeStart}
				updateIsRead={updateIsRead}
				onAddReaction={onAddReaction}
				isAuthoredByUser={isAuthoredByUser}
				firstUnreadId={firstUnreadId}
				ref={containerRef}
			>
				<StyledElement
					element="div"
					className="messageItem"
					styles={styles}
					attributes={{
						singlePadding: !repliedMessage,
						isAuthoredByUser,
						fullWidth: isImageEnlarged,
						isMoved: isAuthoredByUser && isSelectMode,
					}}
				>
					{repliedMessage && <ReplyTo message={repliedMessage} />}
					{message.imageUrl && (
						<ImageMessage
							message={message}
							isEnlarged={isImageEnlarged}
							onEnlargeToggle={toggleEnlargeHandler}
							width={containerRef.current?.clientWidth}
						/>
					)}
					{message.text && (
						<StyledElement
							element="div"
							className="innerMessageItem"
							styles={styles}
							attributes={{ withPadding: !repliedMessage }}
						>
							{messageText}
						</StyledElement>
					)}
					<MessageBottom message={message} withOffset={!repliedMessage} />
				</StyledElement>
				{isSelectMode ? <StyledCheckbox id={message.id} checked={isSelected} /> : null}
			</SingleMessageWrapper>
		);
	}

	return (
		<SingleMessageWrapper
			message={message}
			isSelectMode={isSelectMode}
			onReplyMessage={onReplyMessage}
			onEditMessage={onEditMessage}
			addSelection={addSelection}
			onSelectModeStart={onSelectModeStart}
			updateIsRead={updateIsRead}
			onAddReaction={onAddReaction}
			isAuthoredByUser={isAuthoredByUser}
			firstUnreadId={firstUnreadId}
			ref={containerRef}
		>
			<EmojiMessage isAuthoredByUser={isAuthoredByUser} message={message} isSelectMode={isSelectMode} />
			{isSelectMode ? <StyledCheckbox id={message.id} checked={isSelected} /> : null}
		</SingleMessageWrapper>
	);
};
