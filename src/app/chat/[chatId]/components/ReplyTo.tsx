import { SyntheticEvent } from 'react';
import Image from 'next/image';
import styles from '../chatId.module.css';
import { timeOptions } from '@/app/chat/[chatId]/constants';
import { Message } from '@/types';
export const ReplyTo = ({ message }: { message?: Message | null }) => {
	if (!message) return null;

	const clickHandler = (evt: SyntheticEvent) => {
		evt.stopPropagation();
		const node = document.getElementById(message.id);
		node?.scrollIntoView({ behavior: 'smooth' });
	};
	return (
		<div className={styles.replyToContainer} onClick={clickHandler}>
			<div className={styles.replyToAuthor}>{message.authorName}</div>
			<div className={styles.replyToWrapper}>
				{message.text && <div className={styles.replyToText}>{message.text}</div>}
				{message.imageUrl && (
					<div className={styles.repliedMessageImage}>
						<Image src={message.imageUrl!} width={20} height={20} alt="" />
					</div>
				)}
			</div>
			<div className={styles.replyToDateWrapper}>
				<div className={styles.replyToDate}>
					{message.createdAt &&
						new Intl.DateTimeFormat('en-US', timeOptions).format(new Date(message.createdAt))}
				</div>
			</div>
		</div>
	);
};
