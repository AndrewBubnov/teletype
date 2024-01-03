import { useAspectRatio } from '@/app/chat/[chatId]/hooks/useAspectRatio';
import { PreviewImage, PreviewImageDialog } from '@/app/chat/[chatId]/styled';
import { getDialogPaperProps } from '@/app/chat/[chatId]/utils/getDialogPaperProps';
import { MOBILE_WIDTH } from '@/app/chat/[chatId]/constants';
import { ImagePreviewModalProps } from '@/types';
export const ImagePreviewModal = ({ src, open, onClose, width }: ImagePreviewModalProps) => {
	const aspectRatio = useAspectRatio(src);
	if (!src) return null;
	return (
		<PreviewImageDialog
			fullWidth
			onClose={onClose}
			PaperProps={getDialogPaperProps(width, aspectRatio, window.innerWidth < MOBILE_WIDTH)}
			open={open}
		>
			<PreviewImage src={src} alt="preview" />
		</PreviewImageDialog>
	);
};
