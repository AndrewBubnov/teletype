import { useAspectRatio } from '@/app/chat/[chatId]/hooks/useAspectRatio';
import {
	ImageWrapper,
	StyledCloseFullWidthIcon,
	StyledFullWidthIcon,
	StyledImage,
	StyledImageButton,
} from '@/app/chat/[chatId]/styled';
import { DEFAULT_IMAGE_WIDTH, ENLARGE_RATIO, MAX_MESSAGE_WIDTH_RATIO } from '@/app/chat/[chatId]/constants';
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
			<ImageWrapper>
				<StyledImage
					src={message.imageUrl}
					width={aspectRatio * enlargedImageHeight}
					height={enlargedImageHeight}
					alt=""
				/>
				<StyledImageButton onClick={onEnlargeToggle}>
					<StyledCloseFullWidthIcon />
				</StyledImageButton>
			</ImageWrapper>
		);
	}

	return (
		<ImageWrapper>
			<StyledImage
				src={message.imageUrl}
				width={width * MAX_MESSAGE_WIDTH_RATIO}
				height={(width * MAX_MESSAGE_WIDTH_RATIO) / aspectRatio}
				alt=""
			/>
			<StyledImageButton onClick={onEnlargeToggle}>
				<StyledFullWidthIcon />
			</StyledImageButton>
		</ImageWrapper>
	);
};
