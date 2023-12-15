import { useEffect, useRef } from 'react';
import { useUser } from '@clerk/nextjs';
import { useLongPress } from '@/app/chat/[chatId]/hooks/useLongPress';
import { AuthorMessageWrapper, InterlocutorMessageWrapper, SubContainer } from '@/app/chat/[chatId]/styled';
import { TextMessage } from '@/app/chat/[chatId]/components/TextMessage';
import { ImageMessage } from '@/app/chat/[chatId]/components/ImageMessage';
import { MessageType, SingleMessageProps } from '@/types';

export const SingleMessage = ({ message, onContextMenuToggle, repliedMessage }: SingleMessageProps) => {
	const { user } = useUser();
	const containerRef = useRef<HTMLDivElement | null>(null);
	const messageRef = useRef<HTMLDivElement | null>(null);

	const isAuthoredByUser = message.authorId === user?.id;

	useEffect(() => {
		if (isAuthoredByUser) containerRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [isAuthoredByUser]);

	const Container = isAuthoredByUser ? AuthorMessageWrapper : InterlocutorMessageWrapper;

	const onLongPress = () => {
		const params = messageRef.current?.getBoundingClientRect();
		if (!params) return;
		onContextMenuToggle('open', params);
	};

	const pressHandler = useLongPress({ onLongPress });

	return (
		<Container ref={containerRef} id={message.id}>
			<SubContainer ref={messageRef}>
				{message.type === MessageType.TEXT ? (
					<TextMessage
						message={message}
						repliedMessage={repliedMessage}
						isAuthoredByUser={isAuthoredByUser}
						pressHandler={pressHandler}
					/>
				) : (
					<ImageMessage
						message={message}
						repliedMessage={repliedMessage}
						isAuthoredByUser={isAuthoredByUser}
						pressHandler={pressHandler}
					/>
				)}
			</SubContainer>
		</Container>
	);
};
