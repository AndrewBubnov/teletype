import Image from 'next/image';
import { StyledElement } from '@/app/chat/[chatId]/components/StyledElement';
import { MdOutlineDone as SentIcon } from 'react-icons/md';
import { MdOutlineDoneAll as IsReadIcon } from 'react-icons/md';
import styles from '../chatId.module.css';
import { options } from '@/app/chat/[chatId]/constants';
import { Message } from '@/types';

export const MessageBottom = ({ message, withOffset = false }: { message: Message; withOffset?: boolean }) => (
	<StyledElement
		element="div"
		className="messageItemBottom"
		styles={styles}
		attributes={{ multipleChild: !!message.reaction, withOffset }}
	>
		{message.reaction && (
			<div className={styles.reactionWrapper}>
				{String.fromCodePoint(parseInt(message.reaction, 16))}
				{message.reactionAuthorImageUrl && (
					<Image
						className={styles.reactionAuthorImage}
						src={message.reactionAuthorImageUrl}
						height={16}
						width={16}
						alt="author"
					/>
				)}
			</div>
		)}
		<div className={styles.timeWrapper}>
			{new Intl.DateTimeFormat('en-US', options).format(new Date(message.createdAt))}
			{message.isRead ? <IsReadIcon className={styles.statusIcon} /> : <SentIcon className={styles.statusIcon} />}
		</div>
	</StyledElement>
);
