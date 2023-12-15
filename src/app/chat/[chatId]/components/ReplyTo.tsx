import { Message } from '@/types';
import { options } from '@/app/chat/[chatId]/constants';
import {
	ReplyToAuthor,
	ReplyToContainer,
	ReplyToDate,
	ReplyToDateWrapper,
	ReplyToText,
} from '@/app/chat/[chatId]/styled';

export const ReplyTo = ({ message }: { message?: Message | null }) => {
	if (!message) return null;
	const clickHandler = () => {
		const node = document.getElementById(message.id);
		node?.scrollIntoView({ behavior: 'smooth' });
	};
	return (
		<ReplyToContainer onMouseDown={clickHandler} onTouchStart={clickHandler}>
			<ReplyToAuthor>{message.authorName}</ReplyToAuthor>
			<ReplyToText>{message.text}</ReplyToText>
			<ReplyToDateWrapper>
				<ReplyToDate>
					{message.date && new Intl.DateTimeFormat('en-US', options).format(new Date(message.date))}
				</ReplyToDate>
			</ReplyToDateWrapper>
		</ReplyToContainer>
	);
};
