import { Flipped } from '@/app/chat-list/[chatId]/components/Flipped/Flipped';
import { FaAngleDown as DownIcon } from 'react-icons/fa6';
import { ScrollToBottomButtonProps } from '@/types';
import styles from './UnreadMessagesButton.module.css';

export const UnreadMessagesButton = ({ unreadNumber, onPress }: ScrollToBottomButtonProps) => (
	<button className={styles.unreadMessagesButton} onTouchStart={onPress} onMouseDown={onPress}>
		<Flipped className={styles.unreadNumber}>{unreadNumber}</Flipped>
		<div className={styles.downIconWrapper}>
			<DownIcon className={styles.downIcon} />
		</div>
	</button>
);
