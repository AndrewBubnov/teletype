import { useEffect, useRef } from 'react';
import { useUser } from '@clerk/nextjs';
import { AuthorMessageWrapper, InterlocutorMessageWrapper, SubContainer } from '@/app/chat/[chatId]/styled';
import { TextMessage } from '@/app/chat/[chatId]/components/TextMessage';
import { ImageMessage } from '@/app/chat/[chatId]/components/ImageMessage';
import { MessageType, SingleMessageProps } from '@/types';

export const SingleMessage = ({ message, onContextMenuToggle, repliedMessage, updateIsRead }: SingleMessageProps) => {
	const { user } = useUser();
	const containerRef = useRef<HTMLDivElement | null>(null);
	const messageRef = useRef<HTMLDivElement | null>(null);

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
		const params = messageRef.current?.getBoundingClientRect();
		if (!params) return;
		onContextMenuToggle('open', params);
	};

	return (
		<Container ref={containerRef} id={message.id}>
			<SubContainer ref={messageRef}>
				{message.type === MessageType.TEXT ? (
					<TextMessage
						message={message}
						repliedMessage={repliedMessage}
						isAuthoredByUser={isAuthoredByUser}
						onPress={onPress}
					/>
				) : (
					<ImageMessage
						message={message}
						repliedMessage={repliedMessage}
						isAuthoredByUser={isAuthoredByUser}
						onPress={onPress}
					/>
				)}
			</SubContainer>
		</Container>
	);
};
