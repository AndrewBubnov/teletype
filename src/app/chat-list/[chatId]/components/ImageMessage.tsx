import Image from 'next/image';
import { useAspectRatio } from '@/app/chat-list/[chatId]/hooks/useAspectRatio';
import { DEFAULT_IMAGE_WIDTH, ENLARGE_RATIO, MAX_MESSAGE_WIDTH_RATIO } from '@/app/chat-list/[chatId]/constants';
import { ImageMessageProps } from '@/types';
import styles from '../chatId.module.css';

export const ImageMessage = ({ message, isEnlarged, width = DEFAULT_IMAGE_WIDTH }: ImageMessageProps) => {
	const aspectRatio = useAspectRatio(message.imageUrl);

	if (!message.imageUrl) return null;

	if (isEnlarged) {
		const enlargedImageHeight = window.innerHeight * ENLARGE_RATIO;
		return (
			<div className={styles.imageWrapper}>
				<Image
					className={styles.styledImage}
					src={message.imageUrl}
					width={aspectRatio * enlargedImageHeight}
					height={enlargedImageHeight}
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
				width={width * MAX_MESSAGE_WIDTH_RATIO}
				height={(width * MAX_MESSAGE_WIDTH_RATIO) / aspectRatio}
				alt=""
			/>
		</div>
	);
};
