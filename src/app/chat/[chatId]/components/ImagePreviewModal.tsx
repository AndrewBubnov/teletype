import Image from 'next/image';
import { useAspectRatio } from '@/app/chat/[chatId]/hooks/useAspectRatio';
import { getDialogPaperProps } from '@/app/chat/[chatId]/utils/getDialogPaperProps';
import { Dialog } from '@/app/chat/[chatId]/components/Dialog';
import styles from '../chatId.module.css';
import { MOBILE_WIDTH } from '@/app/chat/[chatId]/constants';
import { ImagePreviewModalProps } from '@/types';

export const ImagePreviewModal = ({ src, open, onClose, width }: ImagePreviewModalProps) => {
	const aspectRatio = useAspectRatio(src);
	if (!src) return null;
	return (
		<Dialog
			onClose={onClose}
			className={styles.fullWidth}
			style={getDialogPaperProps(width, aspectRatio, window.innerWidth < MOBILE_WIDTH)}
			isOpen={open}
		>
			<Image fill src={src} alt="preview" className={styles.previewImage} />
		</Dialog>
	);
};
