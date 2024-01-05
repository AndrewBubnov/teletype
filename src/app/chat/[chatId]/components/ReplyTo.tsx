import { Message } from '@/types';
import { options } from '@/app/chat/[chatId]/constants';
import {
	RepliedMessageImage,
	ReplyToAuthor,
	ReplyToContainer,
	ReplyToDate,
	ReplyToDateWrapper,
	ReplyToText,
	ReplyToWrapper,
} from '@/app/chat/[chatId]/styled';
import Image from 'next/image';
import { SyntheticEvent } from 'react';

export const ReplyTo = ({ message }: { message?: Message | null }) => {
	if (!message) return null;
	const clickHandler = (evt: SyntheticEvent) => {
		evt.stopPropagation();
		const node = document.getElementById(message.id);
		node?.scrollIntoView({ behavior: 'smooth' });
	};
	return (
		<ReplyToContainer onClick={clickHandler}>
			<ReplyToAuthor>{message.authorName}</ReplyToAuthor>
			<ReplyToWrapper>
				{message.text && <ReplyToText>{message.text}</ReplyToText>}
				{message.imageUrl && (
					<RepliedMessageImage>
						<Image src={message.imageUrl!} width={20} height={20} alt="" />
					</RepliedMessageImage>
				)}
			</ReplyToWrapper>
			<ReplyToDateWrapper>
				<ReplyToDate>
					{message.createdAt && new Intl.DateTimeFormat('en-US', options).format(new Date(message.createdAt))}
				</ReplyToDate>
			</ReplyToDateWrapper>
		</ReplyToContainer>
	);
};
