import { Message, MessageType } from '@/types';
import { options } from '@/app/chat/[chatId]/constants';
import {
	ReplyToAuthor,
	ReplyToContainer,
	ReplyToDate,
	ReplyToDateWrapper,
	ReplyToText,
} from '@/app/chat/[chatId]/styled';
import Image from 'next/image';

export const ReplyTo = ({ message }: { message?: Message | null }) => {
	if (!message) return null;
	const clickHandler = () => {
		const node = document.getElementById(message.id);
		node?.scrollIntoView({ behavior: 'smooth' });
	};
	return (
		<ReplyToContainer onMouseDown={clickHandler} onTouchStart={clickHandler}>
			<ReplyToAuthor>{message.authorName}</ReplyToAuthor>
			<ReplyToText>
				{message.type === MessageType.TEXT ? (
					message.text
				) : (
					<Image src={message.imageUrl!} width={20} height={20} alt="" />
				)}
			</ReplyToText>
			<ReplyToDateWrapper>
				<ReplyToDate>
					{message.date && new Intl.DateTimeFormat('en-US', options).format(new Date(message.date))}
				</ReplyToDate>
			</ReplyToDateWrapper>
		</ReplyToContainer>
	);
};
