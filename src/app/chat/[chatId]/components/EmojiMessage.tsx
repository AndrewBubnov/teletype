import { Box } from '@mui/material';
import { EmojiDisplayWrapper, MessageItem } from '@/app/chat/[chatId]/styled';
import { ReplyTo } from '@/app/chat/[chatId]/components/ReplyTo';
import { MessageBottom } from '@/app/chat/[chatId]/components/MessageBottom';
import { MessageProps } from '@/types';

export const EmojiMessage = ({ isAuthoredByUser, onPress, message, repliedMessage }: MessageProps) => {
	if (!message.text) return null;

	return (
		<MessageItem singlePadding transparent isAuthoredByUser={isAuthoredByUser} onClick={onPress}>
			<ReplyTo message={repliedMessage} />
			<EmojiDisplayWrapper>
				{message.text.split(' ').map((emoji, index) => (
					<Box component="span" key={`${emoji}${index}`}>
						{emoji}
					</Box>
				))}
			</EmojiDisplayWrapper>
			<MessageBottom message={message} withOffset={true} />
		</MessageItem>
	);
};
