import { CSSProperties, SyntheticEvent, useEffect, useMemo, useRef, useState } from 'react';
import { useLongPress } from '@/app/chat-list/[chatId]/hooks/useLongPress';
import { EmojiMessage } from '@/app/chat-list/[chatId]/components/EmojiMessage';
import { ReplyTo } from '@/app/chat-list/[chatId]/components/ReplyTo';
import { ImageMessage } from '@/app/chat-list/[chatId]/components/ImageMessage';
import { MessageBottom } from '@/app/chat-list/[chatId]/components/MessageBottom';
import { LinkMessagePart } from '@/app/chat-list/[chatId]/components/LinkMessagePart';
import { StyledElement } from '@/app/chat-list/[chatId]/components/StyledElement';
import { StyledCheckbox } from '@/app/shared/components/StyledCheckbox';
import { dateOptions, urlRegex } from '@/app/chat-list/[chatId]/constants';
import { MessageType, SingleMessageProps } from '@/types';
import styles from '../chatId.module.css';

export const SingleMessage = ({
	message,
	onContextMenuToggle,
	repliedMessage,
	updateIsRead,
	isScrolledTo,
	isAuthoredByUser,
	isSelectMode,
	isSelected,
	onSelectModeStart,
	firstUnreadId,
}: SingleMessageProps) => {
	const [isImageEnlarged, setIsImageEnlarged] = useState<boolean>(false);

	const containerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (!containerRef.current || message.isRead) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) observer.disconnect();
				if (entry.isIntersecting && updateIsRead) updateIsRead(message);
			},
			{ rootMargin: '0px', threshold: 0.5 }
		);
		observer.observe(containerRef.current);
		return () => observer.disconnect();
	}, [message, updateIsRead]);

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

	const toggleEnlargeHandler = (evt: SyntheticEvent) => {
		evt.stopPropagation();
		setIsImageEnlarged(prevState => !prevState);
	};

	const onPress = () => {
		const params = containerRef.current?.getBoundingClientRect();
		if (!params) return;
		onContextMenuToggle('open', params);
	};

	const pressHandler = useLongPress({ onPress, onLongPress: onSelectModeStart });

	const isFirstDateDateMessagePrefix = useMemo(() => {
		if (message.isFirstDateMessage) {
			return (
				<div className={styles.newDateIndicator}>
					{new Intl.DateTimeFormat('en-US', dateOptions).format(new Date(message.createdAt))}
				</div>
			);
		}
		return null;
	}, [message.createdAt, message.isFirstDateMessage]);

	const isFirstUnreadPrefix = useMemo(() => {
		if (firstUnreadId === message.id) {
			return <div className={styles.unreadIndicator}>Unread messages</div>;
		}
		return null;
	}, [firstUnreadId, message.id]);

	if (message.type === MessageType.COMMON) {
		return (
			<label className={styles.styledLabel} htmlFor={message.id} {...pressHandler}>
				{isFirstDateDateMessagePrefix}
				{isFirstUnreadPrefix}
				<div className={styles.messageWrapper} ref={containerRef} id={message.id}>
					<StyledElement
						element="div"
						className="messageItem"
						styles={styles}
						style={
							{
								'--xOffset': `calc(-${containerRef.current?.clientWidth}px + 100% + 1.5rem)`,
							} as CSSProperties
						}
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
				</div>
			</label>
		);
	}

	return (
		<label className={styles.styledLabel} htmlFor={message.id} {...pressHandler}>
			{isFirstDateDateMessagePrefix}
			{isFirstUnreadPrefix}
			<div className={styles.messageWrapper} ref={containerRef} id={message.id}>
				<EmojiMessage isAuthoredByUser={isAuthoredByUser} message={message} isSelectMode={isSelectMode} />
				{isSelectMode ? <StyledCheckbox id={message.id} checked={isSelected} /> : null}
			</div>
		</label>
	);
};
