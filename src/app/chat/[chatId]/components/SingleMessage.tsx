import { SyntheticEvent, useEffect, useMemo, useRef, useState } from 'react';
import { EmojiMessage } from '@/app/chat/[chatId]/components/EmojiMessage';
import { ReplyTo } from '@/app/chat/[chatId]/components/ReplyTo';
import { ImageMessage } from '@/app/chat/[chatId]/components/ImageMessage';
import { MessageBottom } from '@/app/chat/[chatId]/components/MessageBottom';
import { LinkMessagePart } from '@/app/chat/[chatId]/components/LinkMessagePart';
import { StyledElement } from '@/app/chat/[chatId]/components/StyledElement';
import { StyledCheckbox } from '@/app/shared/components/StyledCheckbox';
import styles from '../chatId.module.css';
import { urlRegex } from '@/app/chat/[chatId]/constants';
import { MessageType, SingleMessageProps } from '@/types';
import { useLongPress } from '@/app/chat/[chatId]/hooks/useLongPress';

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

	if (message.type === MessageType.COMMON) {
		return (
			<label className={styles.styledLabel} htmlFor={message.id} {...pressHandler}>
				<div className={styles.messageWrapper} ref={containerRef} id={message.id}>
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
						<ReplyTo message={repliedMessage} />
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
			<div className={styles.messageWrapper} ref={containerRef} id={message.id}>
				<EmojiMessage isAuthoredByUser={isAuthoredByUser} message={message} repliedMessage={repliedMessage} />
				{isSelectMode ? <StyledCheckbox id={message.id} checked={isSelected} /> : null}
			</div>
		</label>
	);
};
