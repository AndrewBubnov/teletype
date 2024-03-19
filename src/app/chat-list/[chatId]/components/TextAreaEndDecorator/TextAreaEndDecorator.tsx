import Image from 'next/image';
import { clsx } from 'clsx';
import { LuSendHorizonal as SendIcon } from 'react-icons/lu';
import { IoCloseOutline as CloseIcon } from 'react-icons/io5';
import { BsCamera as CameraIcon } from 'react-icons/bs';
import { FileUploadInput } from '@/app/chat-list/[chatId]/components/FileUploadInput/FileUploadInput';
import { TextAreaEndDecoratorProps } from '@/types';
import styles from './TextAreaEndDecorator.module.css';

export const TextAreaEndDecorator = ({
	messageImageUrl,
	openPreviewModal,
	onDropImageUrl,
	onSelectFile,
	onSubmit,
	onCameraStart,
	isLoading,
	disabled,
}: TextAreaEndDecoratorProps) => (
	<div className={styles.endDecorator}>
		<div className={styles.previewWrapper} onClick={openPreviewModal}>
			{messageImageUrl ? (
				<Image fill src={messageImageUrl} alt="preview" className={styles.previewImage} />
			) : null}
		</div>
		<div className={styles.imageIconsWrapper}>
			{messageImageUrl ? (
				<button className={clsx(styles.iconButton, styles.additionalIcon)} onClick={onDropImageUrl}>
					<CloseIcon />
				</button>
			) : null}
			<div className={styles.imageIconsInnerWrapper}>
				<FileUploadInput onChange={onSelectFile} />
				<button className={clsx(styles.iconButton, styles.additionalIcon)} onClick={onCameraStart}>
					<CameraIcon />
				</button>
				<button className={styles.sendButton} type="submit" onClick={onSubmit} disabled={disabled}>
					{isLoading ? <div className={styles.miniLoader} /> : <SendIcon />}
				</button>
			</div>
		</div>
	</div>
);
