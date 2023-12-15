import { useEffect, useRef } from 'react';
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import { useLongPress } from '@/app/chat/[chatId]/hooks/useLongPress';
import { ReplyTo } from '@/app/chat/[chatId]/components/ReplyTo';
import {
	AuthorMessageWrapper,
	InterlocutorMessageWrapper,
	MessageItem,
	MessageItemBottom,
	ReactionAuthorImage,
	ReactionWrapper,
	SubContainer,
	TimeWrapper,
} from '@/app/chat/[chatId]/styled';
import { options } from '@/app/chat/[chatId]/constants';
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
					<MessageItem isAuthoredByUser={isAuthoredByUser} {...pressHandler}>
						<ReplyTo message={repliedMessage} />
						{message.text!}
						<MessageItemBottom multipleChild={!!message.reaction}>
							{message.reaction && (
								<ReactionWrapper>
									{String.fromCodePoint(parseInt(message.reaction, 16))}
									{message.reactionAuthorImageUrl && (
										<ReactionAuthorImage src={message.reactionAuthorImageUrl} alt="author" />
									)}
								</ReactionWrapper>
							)}
							<TimeWrapper>
								{new Intl.DateTimeFormat('en-US', options).format(new Date(message.date))}
							</TimeWrapper>
						</MessageItemBottom>
					</MessageItem>
				) : (
					<MessageItem transparent isAuthoredByUser={isAuthoredByUser} {...pressHandler}>
						<ReplyTo message={repliedMessage} />
						<Image
							src={message.imageUrl!}
							width={message.type === MessageType.EMOJI ? 40 : 100}
							height={message.type === MessageType.EMOJI ? 40 : 100}
							alt=""
						/>
						{message.reaction && (
							<ReactionWrapper>{String.fromCodePoint(parseInt(message.reaction, 16))}</ReactionWrapper>
						)}
						<TimeWrapper>
							{new Intl.DateTimeFormat('en-US', options).format(new Date(message.date))}
						</TimeWrapper>
					</MessageItem>
				)}
			</SubContainer>
		</Container>
	);
};
