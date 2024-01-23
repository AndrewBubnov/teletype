import styles from '../chatId.module.css';
import { DialogProps } from '@/types';

export const Dialog = ({ children, isOpen, onClose, style = {} }: DialogProps) => {
	return isOpen ? (
		<div className={styles.backdrop} onClick={onClose}>
			<div className={styles.dialog} style={style}>
				{children}
			</div>
		</div>
	) : null;
};
