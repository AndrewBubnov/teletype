import { useAspectRatio } from '@/app/chat/[chatId]/hooks/useAspectRatio';
import { SyntheticEvent, useState } from 'react';
import {
	BasicImageWrapper,
	StyledCloseFullWidthIcon,
	StyledFullWidthIcon,
	StyledImage,
	StyledImageButton,
} from '@/app/chat/[chatId]/styled';
import { DEFAULT_IMAGE_WIDTH, IMAGE_RATIO } from '@/app/chat/[chatId]/constants';
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
		return (
			<>
				<StyledImage src={message.imageUrl} fill alt="" />
				<StyledImageButton onClick={onEnlargeToggle}>
					<StyledCloseFullWidthIcon />
				</StyledImageButton>
			</>
		);
	}

	return (
		<BasicImageWrapper>
			<StyledImage
				src={message.imageUrl}
				width={width * IMAGE_RATIO}
				height={(width * IMAGE_RATIO) / aspectRatio}
				alt=""
			/>
			<StyledImageButton onClick={onEnlargeToggle}>
				<StyledFullWidthIcon />
			</StyledImageButton>
		</BasicImageWrapper>
	);
};
