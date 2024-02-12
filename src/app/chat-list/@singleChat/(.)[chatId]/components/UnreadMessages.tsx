import { FaAngleDown as DownIcon } from 'react-icons/fa6';
import styles from '../chatId.module.css';
import { ScrollToBottomButtonProps } from '@/types';

export const UnreadMessages = ({ unreadNumber, onPress }: ScrollToBottomButtonProps) => (
	<button className={styles.unreadMessagesButton} onTouchStart={onPress} onMouseDown={onPress}>
		<div className={styles.unreadNumber}>{unreadNumber}</div>
		<div className={styles.downIconWrapper}>
			<DownIcon className={styles.downIcon} />
		</div>
	</button>
);
