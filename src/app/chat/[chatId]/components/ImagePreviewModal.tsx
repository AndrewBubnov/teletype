import { useAspectRatio } from '@/app/chat/[chatId]/hooks/useAspectRatio';
import { PreviewImage, PreviewImageDialog } from '@/app/chat/[chatId]/styled';
import { getDialogPaperProps } from '@/app/chat/[chatId]/utils/getDialogPaperProps';
import { ImagePreviewModalProps } from '@/types';

export const ImagePreviewModal = ({ src, open, onClose, width }: ImagePreviewModalProps) => {
	const aspectRatio = useAspectRatio(src);
	return (
		<PreviewImageDialog
			fullWidth
			onClose={onClose}
			PaperProps={getDialogPaperProps(width, aspectRatio)}
			open={open}
		>
			<PreviewImage src={src} alt="preview" />
		</PreviewImageDialog>
	);
};
