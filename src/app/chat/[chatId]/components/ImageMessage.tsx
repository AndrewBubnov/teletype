import { useAspectRatio } from '@/app/chat/[chatId]/hooks/useAspectRatio';
import { ReplyTo } from '@/app/chat/[chatId]/components/ReplyTo';
import { MessageBottom } from '@/app/chat/[chatId]/components/MessageBottom';
import { MessageItem, StyledImage } from '@/app/chat/[chatId]/styled';
import { DEFAULT_IMAGE_WIDTH, EMOJI_SIZE, IMAGE_RATIO } from '@/app/chat/[chatId]/constants';
import { MessageProps, MessageType } from '@/types';

export const ImageMessage = ({
	isAuthoredByUser,
	onPress,
	message,
	repliedMessage,
	width = DEFAULT_IMAGE_WIDTH,
}: MessageProps) => {
	const aspectRatio = useAspectRatio(message.imageUrl, message.type);

	if (!message.imageUrl) return null;

	return (
		<MessageItem isImage isAuthoredByUser={isAuthoredByUser} onClick={onPress}>
			<ReplyTo message={repliedMessage} />
			<StyledImage
				src={message.imageUrl}
				width={message.type === MessageType.EMOJI ? EMOJI_SIZE : width * IMAGE_RATIO}
				height={message.type === MessageType.EMOJI ? EMOJI_SIZE : (width * IMAGE_RATIO) / aspectRatio}
				alt=""
			/>
			<MessageBottom message={message} />
		</MessageItem>
	);
};
