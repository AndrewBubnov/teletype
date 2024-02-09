import { clsx } from 'clsx';
import Image from 'next/image';
import { useAnimate } from '@/app/shared/hooks/useAnimate';
import { IoCloseOutline as ClearIcon } from 'react-icons/io5';
import { timeOptions } from '@/app/chat/[chatId]/constants';
import { RepliedMessageBoxProps } from '@/types';
import styles from '../chatId.module.css';

export const RepliedMessageBox = ({ message, onDropMessage, authorName }: RepliedMessageBoxProps) => {
	const { isActive, closeHandler, onCloseReturn } = useAnimate(onDropMessage);

	return (
		<div
			className={clsx(styles.repliedMessageContainer, {
				[styles.repliedMessageContainerIn]: isActive,
				[styles.repliedMessageContainerOut]: !isActive,
			})}
			onTransitionEnd={onCloseReturn}
		>
			<div className={styles.repliedMessageAuthor}>
				<div className={styles.repliedMessageAuthorInner}>
					<button className={styles.dropReplyMessageButton}>
						<ClearIcon onClick={closeHandler} />
					</button>
					<div className={styles.repliedMessageInner}>{authorName}</div>
				</div>
				<div className={styles.repliedTimeContainer}>
					<div>{new Intl.DateTimeFormat('en-US', timeOptions).format(new Date(message.createdAt))}</div>
				</div>
			</div>
			<div className={styles.repliedMessageText}>
				<div className={styles.repliedMessageInner}>{message.text && message.text}</div>
				{message.imageUrl && (
					<div className={styles.repliedMessageImage}>
						<Image src={message.imageUrl!} width={20} height={20} alt="" />
					</div>
				)}
			</div>
		</div>
	);
};
