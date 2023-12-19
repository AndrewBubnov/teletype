import { useMemo } from 'react';
import { useAspectRatio } from '@/app/chat/[chatId]/hooks/useAspectRatio';
import { ReplyTo } from '@/app/chat/[chatId]/components/ReplyTo';
import { MessageBottom } from '@/app/chat/[chatId]/components/MessageBottom';
import { MessageItem, StyledImage } from '@/app/chat/[chatId]/styled';
import { BASE64_TOKEN, DEFAULT_IMAGE_WIDTH, EMOJI_SIZE, IMAGE_RATIO } from '@/app/chat/[chatId]/constants';
import { MessageProps } from '@/types';

export const ImageMessage = ({
	isAuthoredByUser,
	onPress,
	message,
	repliedMessage,
	width = DEFAULT_IMAGE_WIDTH,
}: MessageProps) => {
	const aspectRatio = useAspectRatio(message.imageUrl, message.type);

	const isBase64 = useMemo(() => message.imageUrl && message.imageUrl.includes(BASE64_TOKEN), [message.imageUrl]);

	if (!message.imageUrl) return null;

	return (
		<MessageItem isImage isAuthoredByUser={isAuthoredByUser} onClick={onPress}>
			<ReplyTo message={repliedMessage} />
			<StyledImage
				src={message.imageUrl}
				width={isBase64 ? width * IMAGE_RATIO : EMOJI_SIZE}
				height={isBase64 ? (width * IMAGE_RATIO) / aspectRatio : EMOJI_SIZE}
				alt=""
			/>
			{message.text && message.text}
			<MessageBottom message={message} />
		</MessageItem>
	);
};
