import { useIsWideModeStore } from '@/store';
import Image from 'next/image';
import { useAspectRatio } from '@/app/chat-list/[chatId]/hooks/useAspectRatio';
import { getDialogPaperProps } from '@/app/chat-list/[chatId]/utils/getDialogPaperProps';
import { Dialog } from '@/app/chat-list/[chatId]/components/Dialog';
import { getImageWidth } from '@/app/chat-list/[chatId]/utils/getImageWidth';
import { ImagePreviewModalProps } from '@/types';
import styles from '../chatId.module.css';

export const ImagePreviewModal = ({ src, open, onClose, width }: ImagePreviewModalProps) => {
	const isWideMode = useIsWideModeStore(state => state.isWideMode);
	const aspectRatio = useAspectRatio(src);

	const imageWidth = getImageWidth({ width, aspectRatio, isWideMode });

	if (!src) return null;
	return (
		<Dialog
			onClose={onClose}
			className={styles.fullWidth}
			style={getDialogPaperProps(imageWidth, aspectRatio, !isWideMode)}
			isOpen={open}
		>
			<Image fill src={src} alt="preview" className={styles.previewImage} />
		</Dialog>
	);
};
