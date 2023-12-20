import { useAspectRatio } from '@/app/chat/[chatId]/hooks/useAspectRatio';
import { useMemo } from 'react';
import { BASE64_TOKEN, DEFAULT_IMAGE_WIDTH, EMOJI_SIZE, IMAGE_RATIO } from '@/app/chat/[chatId]/constants';
import { Message } from '@/types';
import { StyledImage } from '@/app/chat/[chatId]/styled';

interface ImageMessageProps {
	message: Message;
	width?: number;
}

export const ImageMessage = ({ message, width = DEFAULT_IMAGE_WIDTH }: ImageMessageProps) => {
	const aspectRatio = useAspectRatio(message.imageUrl);

	const isBase64 = useMemo(() => message.imageUrl && message.imageUrl.includes(BASE64_TOKEN), [message.imageUrl]);
	if (!message.imageUrl) return null;

	return (
		<StyledImage
			src={message.imageUrl}
			width={isBase64 ? width * IMAGE_RATIO : EMOJI_SIZE}
			height={isBase64 ? (width * IMAGE_RATIO) / aspectRatio : EMOJI_SIZE}
			alt=""
		/>
	);
};
