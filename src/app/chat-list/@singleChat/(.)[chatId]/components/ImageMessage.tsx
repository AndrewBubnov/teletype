import Image from 'next/image';
import { useAspectRatio } from '@/app/chat-list/[chatId]/hooks/useAspectRatio';
import { LuMaximize2 as FullWidthIcon } from 'react-icons/lu';
import { LuMinimize2 as CloseFullWidthIcon } from 'react-icons/lu';
import styles from '../chatId.module.css';
import { DEFAULT_IMAGE_WIDTH, ENLARGE_RATIO, MAX_MESSAGE_WIDTH_RATIO } from '@/app/chat-list/[chatId]/constants';
import { ImageMessageProps } from '@/types';

export const ImageMessage = ({
	message,
	isEnlarged,
	onEnlargeToggle,
	width = DEFAULT_IMAGE_WIDTH,
}: ImageMessageProps) => {
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
				<button className={styles.imageButton} onClick={onEnlargeToggle}>
					<CloseFullWidthIcon />
				</button>
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
			<button className={styles.imageButton} onClick={onEnlargeToggle}>
				<FullWidthIcon />
			</button>
		</div>
	);
};
