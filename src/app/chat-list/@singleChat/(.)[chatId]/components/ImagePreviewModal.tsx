import Image from 'next/image';
import { useAspectRatio } from '@/app/chat-list/[chatId]/hooks/useAspectRatio';
import { getDialogPaperProps } from '@/app/chat-list/[chatId]/utils/getDialogPaperProps';
import { Dialog } from '@/app/chat-list/[chatId]/components/Dialog';
import styles from '../chatId.module.css';
import { MOBILE_WIDTH } from '@/app/chat-list/[chatId]/constants';
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
