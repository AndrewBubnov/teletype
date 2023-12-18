import { ReplyTo } from '@/app/chat/[chatId]/components/ReplyTo';
import {
	MessageItem,
	MessageItemBottom,
	ReactionAuthorImage,
	ReactionWrapper,
	TimeWrapper,
} from '@/app/chat/[chatId]/styled';
import { options } from '@/app/chat/[chatId]/constants';
import { MessageProps } from '@/types';

export const TextMessage = ({ isAuthoredByUser, onPress, message, repliedMessage }: MessageProps) => (
	<MessageItem isAuthoredByUser={isAuthoredByUser} onClick={onPress}>
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
			<TimeWrapper>{new Intl.DateTimeFormat('en-US', options).format(new Date(message.date))}</TimeWrapper>
		</MessageItemBottom>
	</MessageItem>
);
