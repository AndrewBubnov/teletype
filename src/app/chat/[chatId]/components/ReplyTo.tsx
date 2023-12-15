import { Message } from '@/types';
import { options } from '@/app/chat/[chatId]/constants';
import {
	ReplyToAuthor,
	ReplyToContainer,
	ReplyToDate,
	ReplyToDateWrapper,
	ReplyToText,
} from '@/app/chat/[chatId]/styled';

export const ReplyTo = ({ message }: { message?: Message | null }) =>
	message ? (
		<ReplyToContainer>
			<ReplyToAuthor>{message.authorName}</ReplyToAuthor>
			<ReplyToText>{message.text}</ReplyToText>
			<ReplyToDateWrapper>
				<ReplyToDate>
					{message.date && new Intl.DateTimeFormat('en-US', options).format(new Date(message.date))}
				</ReplyToDate>
			</ReplyToDateWrapper>
		</ReplyToContainer>
	) : null;
