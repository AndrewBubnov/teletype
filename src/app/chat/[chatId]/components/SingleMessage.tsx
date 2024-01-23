import { SyntheticEvent, useEffect, useMemo, useRef, useState } from 'react';
import { InnerMessageItem, MessageWrapper } from '@/app/chat/[chatId]/styled';
import { EmojiMessage } from '@/app/chat/[chatId]/components/EmojiMessage';
import { ReplyTo } from '@/app/chat/[chatId]/components/ReplyTo';
import { ImageMessage } from '@/app/chat/[chatId]/components/ImageMessage';
import { MessageBottom } from '@/app/chat/[chatId]/components/MessageBottom';
import { LinkMessagePart } from '@/app/chat/[chatId]/components/LinkMessagePart';
import { StyledCheckbox, StyledLabel } from '@/app/shared/styled';
import styles from '../chatId.module.css';
import { urlRegex } from '@/app/chat/[chatId]/constants';
import { MessageType, SingleMessageProps } from '@/types';
import { StyledElement } from '@/app/chat/[chatId]/components/StyledElement';

export const SingleMessage = ({
	message,
	onContextMenuToggle,
	repliedMessage,
	updateIsRead,
	isScrolledTo,
	isAuthoredByUser,
	isSelectMode,
	isSelected,
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

	if (message.type === MessageType.COMMON) {
		return (
			<label className={styles.styledLabel} htmlFor={message.id}>
				<div className={styles.messageWrapper} ref={containerRef} id={message.id} onClick={onPress}>
					<StyledElement
						element="div"
						className="messageItem"
						styles={styles}
						attributes={{ singlePadding: !repliedMessage, isAuthoredByUser, fullWidth: isImageEnlarged }}
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
							<InnerMessageItem withPadding={!repliedMessage} isAuthoredByUser={isAuthoredByUser}>
								{messageText}
							</InnerMessageItem>
						)}
						<MessageBottom message={message} withOffset={!repliedMessage} />
						{/*</MessageItem>*/}
					</StyledElement>
					{isSelectMode ? <StyledCheckbox id={message.id} checked={isSelected} /> : null}
				</div>
			</label>
		);
	}

	return (
		<StyledLabel htmlFor={message.id}>
			<MessageWrapper ref={containerRef} id={message.id} onClick={onPress}>
				<EmojiMessage isAuthoredByUser={isAuthoredByUser} message={message} repliedMessage={repliedMessage} />
				{isSelectMode ? <StyledCheckbox id={message.id} checked={isSelected} /> : null}
			</MessageWrapper>
		</StyledLabel>
	);
};
