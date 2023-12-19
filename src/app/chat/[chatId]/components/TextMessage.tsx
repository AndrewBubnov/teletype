import { ReplyTo } from '@/app/chat/[chatId]/components/ReplyTo';
import { MessageItem } from '@/app/chat/[chatId]/styled';
import { MessageBottom } from '@/app/chat/[chatId]/components/MessageBottom';
import { MessageProps } from '@/types';

export const TextMessage = ({ isAuthoredByUser, onPress, message, repliedMessage }: MessageProps) => (
	<MessageItem isAuthoredByUser={isAuthoredByUser} onClick={onPress}>
		<ReplyTo message={repliedMessage} />
		{message.text!}
		<MessageBottom message={message} />
	</MessageItem>
);
