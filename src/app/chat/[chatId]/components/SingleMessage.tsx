import { SyntheticEvent, useEffect, useRef, useState } from 'react';
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

export const SingleMessage = ({ message, onContextMenuToggle, repliedMessage, updateIsRead }: SingleMessageProps) => {
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
			{ rootMargin: '0px', threshold: 0.75 }
		);
		observer.observe(containerRef.current);
		return () => observer.disconnect();
	}, [message.isRead, updateIsRead]);

	useEffect(() => {
		if (isAuthoredByUser || isImageEnlarged)
			containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
	}, [isAuthoredByUser, isImageEnlarged]);

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

	if (message.type === MessageType.COMMON) {
		return (
			<Container ref={containerRef} id={message.id}>
				<MessageItem singlePadding={!repliedMessage} isAuthoredByUser={isAuthoredByUser} onClick={onPress}>
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
							{message.text}
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
