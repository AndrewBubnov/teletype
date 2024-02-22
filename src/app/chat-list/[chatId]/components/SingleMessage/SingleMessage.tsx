import { CSSProperties, SyntheticEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLongPress } from '@/app/chat-list/[chatId]/hooks/useLongPress';
import { EmojiMessage } from '@/app/chat-list/[chatId]/components/EmojiMessage/EmojiMessage';
import { ReplyTo } from '@/app/chat-list/[chatId]/components/ReplyTo/ReplyTo';
import { ImageMessage } from '@/app/chat-list/[chatId]/components/ImageMessage/ImageMessage';
import { MessageBottom } from '@/app/chat-list/[chatId]/components/MessageBottom/MessageBottom';
import { LinkMessagePart } from '@/app/chat-list/[chatId]/components/LinkMessagePart/LinkMessagePart';
import { StyledElement } from '@/app/chat-list/[chatId]/components/StyledElement/StyledElement';
import { StyledCheckbox } from '@/app/shared/components/StyledCheckbox';
import { Fade } from '@/app/shared/components/Fade';
import { dateOptions, urlRegex } from '@/app/chat-list/[chatId]/constants';
import { MessageType, SingleMessageProps } from '@/types';
import styles from './SingleMessage.module.css';

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

	const onPress = useCallback(
		(evt: SyntheticEvent) => {
			if ((evt.target as Element).tagName === 'IMG') {
				setIsImageEnlarged(prevState => !prevState);
				return;
			}
			const params = containerRef.current?.getBoundingClientRect();
			if (params) onContextMenuToggle('open', params);
		},
		[onContextMenuToggle]
	);

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

	const xOffset = `calc(-${containerRef.current?.clientWidth}px + 100%)`;

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
						style={{ '--x-offset': xOffset } as CSSProperties}
						attributes={{
							singlePadding: !repliedMessage,
							isAuthoredByUser,
							fullWidth: isImageEnlarged,
							isMoved: isAuthoredByUser && isSelectMode,
						}}
					>
						{repliedMessage && <ReplyTo message={repliedMessage} />}
						{message.imageUrl && <ImageMessage message={message} isEnlarged={isImageEnlarged} />}
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
					<Fade isShown={isSelectMode}>
						<StyledCheckbox id={message.id} checked={isSelected} />
					</Fade>
				</div>
			</label>
		);
	}

	return (
		<label className={styles.styledLabel} htmlFor={message.id} {...pressHandler}>
			{isFirstDateDateMessagePrefix}
			{isFirstUnreadPrefix}
			<div className={styles.messageWrapper} ref={containerRef} id={message.id}>
				<EmojiMessage
					isAuthoredByUser={isAuthoredByUser}
					message={message}
					isSelectMode={isSelectMode}
					xOffset={xOffset}
				/>
				<Fade isShown={isSelectMode}>
					<StyledCheckbox id={message.id} checked={isSelected} />
				</Fade>
			</div>
		</label>
	);
};
