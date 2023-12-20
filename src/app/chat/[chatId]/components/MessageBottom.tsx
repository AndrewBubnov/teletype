import { MessageItemBottom, ReactionAuthorImage, ReactionWrapper, TimeWrapper } from '@/app/chat/[chatId]/styled';
import { options } from '@/app/chat/[chatId]/constants';
import { Message } from '@/types';

export const MessageBottom = ({ message, withOffset }: { message: Message; withOffset?: boolean }) => (
	<MessageItemBottom multipleChild={!!message.reaction} withOffset={withOffset}>
		{message.reaction && (
			<ReactionWrapper>
				{String.fromCodePoint(parseInt(message.reaction, 16))}
				{message.reactionAuthorImageUrl && (
					<ReactionAuthorImage src={message.reactionAuthorImageUrl} alt="author" />
				)}
			</ReactionWrapper>
		)}
		<TimeWrapper>{new Intl.DateTimeFormat('en-US', options).format(new Date(message.date))}</TimeWrapper>
	</MessageItemBottom>
);
