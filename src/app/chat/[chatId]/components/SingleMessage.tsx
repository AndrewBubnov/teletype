import { useEffect, useRef } from 'react';
import {
	AuthorMessageWrapper,
	InterlocutorMessageWrapper,
	MessageItem,
	MessageItemBottom,
	ReactionAuthorImage,
	ReactionWrapper,
	TimeWrapper,
} from '@/app/chat/[chatId]/styled';
import { ContextMenu } from '@/app/chat/[chatId]/components/ContextMenu';
import { options } from '@/app/chat/[chatId]/constants';
import { MessageType, SingleMessageProps } from '@/types';
import { Box } from '@mui/material';
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';

export const SingleMessage = ({ message, menuActive, onContextMenuToggle, onAddReaction }: SingleMessageProps) => {
	const { user } = useUser();
	const containerRef = useRef<HTMLDivElement | null>(null);
	const messageRef = useRef<HTMLDivElement | null>(null);

	const isAuthoredByUser = message.authorId === user?.id;

	useEffect(() => {
		if (isAuthoredByUser) containerRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [isAuthoredByUser]);

	const Container = isAuthoredByUser ? AuthorMessageWrapper : InterlocutorMessageWrapper;

	const closeContextMenuHandler = (evt: PointerEvent) => {
		if (!messageRef.current?.contains(evt.target as Node)) onContextMenuToggle('close');
	};

	const menuOpenHandler = () => {
		const params = messageRef.current?.getBoundingClientRect();
		if (!params) return;
		onContextMenuToggle('open', params);
	};

	return (
		<Container ref={containerRef}>
			<Box ref={messageRef}>
				{message.type === MessageType.TEXT ? (
					<MessageItem isAuthoredByUser={isAuthoredByUser} onClick={menuOpenHandler}>
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
					<MessageItem transparent isAuthoredByUser={isAuthoredByUser} onClick={menuOpenHandler}>
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
			</Box>
			{/*<ContextMenu*/}
			{/*	open={menuActive}*/}
			{/*	containerFn={() => containerRef.current}*/}
			{/*	onAddReaction={onAddReaction}*/}
			{/*	closeContextMenu={closeContextMenuHandler}*/}
			{/*/>*/}
		</Container>
	);
};
