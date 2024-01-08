import {
	CameraIcon,
	EndDecorator,
	ImageIconsInnerWrapper,
	ImageIconsWrapper,
	PreviewImage,
	PreviewWrapper,
	SendButton,
	SendMessageIcon,
	StyledDeleteIcon,
} from '@/app/chat/[chatId]/styled';
import { IconButton } from '@mui/material';
import { FileUploadInput } from '@/app/chat/[chatId]/components/FileUploadInput';
import { TextAreaEndDecoratorProps } from '@/types';

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
			{messageImageUrl ? <PreviewImage src={messageImageUrl} alt="preview" /> : null}
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
