import { FaAngleDown as DownIcon } from 'react-icons/fa6';
import { ScrollToBottomButtonProps } from '@/types';
import styles from './UnreadMessagesButton.module.css';

export const UnreadMessagesButton = ({ unreadNumber, onPress }: ScrollToBottomButtonProps) => (
	<button className={styles.unreadMessagesButton} onTouchStart={onPress} onMouseDown={onPress}>
		<div className={styles.unreadNumber}>{unreadNumber}</div>
		<div className={styles.downIconWrapper}>
			<DownIcon className={styles.downIcon} />
		</div>
	</button>
);
