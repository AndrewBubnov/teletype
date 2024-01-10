import { SyntheticEvent, useEffect, useMemo, useRef, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import {
	AuthorMessageWrapper,
	InnerMessageItem,
	InterlocutorMessageWrapper,
	MessageItem,
} from '@/app/chat/[chatId]/styled';
import { EmojiMessage } from '@/app/chat/[chatId]/components/EmojiMessage';
import { ReplyTo } from '@/app/chat/[chatId]/components/ReplyTo';
import { ImageMessage } from '@/app/chat/[chatId]/components/ImageMessage';
import { MessageBottom } from '@/app/chat/[chatId]/components/MessageBottom';
import { MessageType, SingleMessageProps } from '@/types';
import { LinkMessagePart } from '@/app/chat/[chatId]/components/LinkMessagePart';
import { urlRegex } from '@/app/chat/[chatId]/constants';

export const SingleMessage = ({
	message,
	onContextMenuToggle,
	repliedMessage,
	updateIsRead,
	isScrolledTo,
}: SingleMessageProps) => {
	const { user } = useUser();
	const [isImageEnlarged, setIsImageEnlarged] = useState<boolean>(false);

	const containerRef = useRef<HTMLDivElement | null>(null);

	const isAuthoredByUser = message.authorId === user?.id;

	useEffect(() => {
		if (!containerRef.current || message.isRead) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) observer.disconnect();
				if (entry.isIntersecting && updateIsRead) updateIsRead(entry.target.id);
			},
			{ rootMargin: '0px', threshold: 0.5 }
		);
		observer.observe(containerRef.current);
		return () => observer.disconnect();
	}, [message.isRead, updateIsRead]);

	useEffect(() => {
		if (isScrolledTo || isImageEnlarged)
			containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
	}, [isScrolledTo, isImageEnlarged]);

	const Container = isAuthoredByUser ? AuthorMessageWrapper : InterlocutorMessageWrapper;

	const toggleEnlargeHandler = (evt: SyntheticEvent) => {
		evt.stopPropagation();
		setIsImageEnlarged(prevState => !prevState);
	};

	const onPress = () => {
		const params = containerRef.current?.getBoundingClientRect();
		if (!params) return;
		onContextMenuToggle('open', params);
	};

	const messageText = useMemo(() => {
		const text = message.text || '';
		const links = text.match(urlRegex);

		if (!links) return text;

		return text.split(/\s+/).map((part, index) => {
			if (links.includes(part)) return <LinkMessagePart key={index} href={part} />;
			return <span key={index}>{part}&nbsp;</span>;
		});
	}, [message.text]);

	if (message.type === MessageType.COMMON) {
		return (
			<Container ref={containerRef} id={message.id} onClick={onPress}>
				<MessageItem singlePadding={!repliedMessage} isAuthoredByUser={isAuthoredByUser}>
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
				</MessageItem>
			</Container>
		);
	}

	return (
		<Container ref={containerRef} id={message.id}>
			<EmojiMessage
				isAuthoredByUser={isAuthoredByUser}
				onPress={onPress}
				message={message}
				repliedMessage={repliedMessage}
			/>
		</Container>
	);
};
