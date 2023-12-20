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

export const ReplyTo = ({ message }: { message?: Message | null }) => {
	if (!message) return null;
	const clickHandler = () => {
		const node = document.getElementById(message.id);
		node?.scrollIntoView({ behavior: 'smooth' });
	};
	return (
		<ReplyToContainer onMouseDown={clickHandler} onTouchStart={clickHandler}>
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
					{message.date && new Intl.DateTimeFormat('en-US', options).format(new Date(message.date))}
				</ReplyToDate>
			</ReplyToDateWrapper>
		</ReplyToContainer>
	);
};
