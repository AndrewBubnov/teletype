import { useEffect, useRef } from 'react';
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
	const containerRef = useRef<HTMLDivElement | null>(null);

	const isAuthoredByUser = message.authorId === user?.id;

	useEffect(() => {
		if (!containerRef.current) return;
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					updateIsRead(entry.target.id);
					observer.disconnect();
				}
			},
			{ rootMargin: '0px', threshold: 1 }
		);
		observer.observe(containerRef.current);
		return () => observer.disconnect();
	}, [updateIsRead]);

	useEffect(() => {
		if (isAuthoredByUser) containerRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [isAuthoredByUser]);

	const Container = isAuthoredByUser ? AuthorMessageWrapper : InterlocutorMessageWrapper;

	const onPress = () => {
		const params = containerRef.current?.getBoundingClientRect();
		if (!params) return;
		onContextMenuToggle('open', params);
	};

	if (message.type === MessageType.EMOJI) {
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
	}

	return (
		<Container ref={containerRef} id={message.id}>
			<MessageItem singlePadding={!repliedMessage} isAuthoredByUser={isAuthoredByUser} onClick={onPress}>
				<ReplyTo message={repliedMessage} />
				{message.imageUrl && <ImageMessage message={message} width={containerRef.current?.clientWidth} />}
				{message.text && (
					<InnerMessageItem withPadding={!repliedMessage} isAuthoredByUser={isAuthoredByUser}>
						{message.text}
					</InnerMessageItem>
				)}
				<MessageBottom message={message} withOffset={!repliedMessage} />
			</MessageItem>
		</Container>
	);
};
