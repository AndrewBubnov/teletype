import Image from 'next/image';
import { useAspectRatioAndWidth } from '@/app/chat-list/[chatId]/hooks/useAspectRatioAndWidth';
import { DEFAULT_IMAGE_WIDTH, ENLARGE_RATIO, MAX_MESSAGE_WIDTH_RATIO } from '@/app/chat-list/[chatId]/constants';
import { ImageMessageProps } from '@/types';
import styles from './ImageMessage.module.css';

export const ImageMessage = ({ message, isEnlarged }: ImageMessageProps) => {
	const { width, aspectRatio } = useAspectRatioAndWidth(message.imageUrl);

	if (!message.imageUrl) return null;

	if (isEnlarged) {
		return (
			<div className={styles.imageWrapper}>
				<Image
					className={styles.styledImage}
					src={message.imageUrl}
					width={width}
					height={width / aspectRatio}
					alt=""
				/>
			</div>
		);
	}

	return (
		<div className={styles.imageWrapper}>
			<Image
				className={styles.styledImage}
				src={message.imageUrl}
				width={DEFAULT_IMAGE_WIDTH * MAX_MESSAGE_WIDTH_RATIO}
				height={(DEFAULT_IMAGE_WIDTH * MAX_MESSAGE_WIDTH_RATIO) / aspectRatio}
				alt=""
			/>
		</div>
	);
};
