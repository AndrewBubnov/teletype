import styles from '../chatId.module.css';
import { ReactNode } from 'react';

export interface DialogProps {
	children: ReactNode;
	isOpen: boolean;
	onClose(): void;
}
export const Dialog = ({ children, isOpen, onClose }: DialogProps) => {
	return isOpen ? (
		<div className={styles.backdrop} onClick={onClose}>
			{children}
		</div>
	) : null;
};
