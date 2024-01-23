import {
	CameraIcon,
	EndDecorator,
	ImageIconsInnerWrapper,
	ImageIconsWrapper,
	PreviewWrapper,
	SendButton,
	SendMessageIcon,
	StyledDeleteIcon,
} from '@/app/chat/[chatId]/styled';
import { IconButton } from '@mui/material';
import { FileUploadInput } from '@/app/chat/[chatId]/components/FileUploadInput';
import styles from '../chatId.module.css';
import { TextAreaEndDecoratorProps } from '@/types';
import Image from 'next/image';

export const TextAreaEndDecorator = ({
	messageImageUrl,
	openPreviewModal,
	onDropImageUrl,
	onSelectFile,
	onSubmit,
	onCameraStart,
}: TextAreaEndDecoratorProps) => (
	<EndDecorator>
		<PreviewWrapper onClick={openPreviewModal}>
			{messageImageUrl ? (
				<Image fill src={messageImageUrl} alt="preview" className={styles.previewImage} />
			) : null}
		</PreviewWrapper>
		<ImageIconsWrapper>
			{messageImageUrl ? (
				<IconButton onClick={onDropImageUrl}>
					<StyledDeleteIcon />
				</IconButton>
			) : null}
			<ImageIconsInnerWrapper>
				<FileUploadInput onChange={onSelectFile} />
				<IconButton onClick={onCameraStart}>
					<CameraIcon />
				</IconButton>
				<SendButton type="submit" onClick={onSubmit} endIcon={<SendMessageIcon />} />
			</ImageIconsInnerWrapper>
		</ImageIconsWrapper>
	</EndDecorator>
);
