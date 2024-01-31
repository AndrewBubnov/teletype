import Image from 'next/image';
import { IoCloseOutline as ClearIcon } from 'react-icons/io5';
import styles from '../chatId.module.css';
import { timeOptions } from '@/app/chat/[chatId]/constants';
import { RepliedMessageBoxProps } from '@/types';

export const RepliedMessageBox = ({ message, onDropMessage, authorName }: RepliedMessageBoxProps) =>
	message ? (
		<div className={styles.repliedMessageContainer}>
			<div className={styles.repliedMessageAuthor}>
				<div className={styles.repliedMessageAuthorInner}>
					<button className={styles.dropReplyMessageButton}>
						<ClearIcon onMouseDown={onDropMessage} onTouchStart={onDropMessage} />
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
	) : null;
