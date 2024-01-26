import styles from '../chatId.module.css';
import { DialogProps } from '@/types';
import { useClickOutside } from '@/app/shared/hooks/useClickOutside';
import { useRef } from 'react';

export const Dialog = ({ children, isOpen, onClose, className = '', style = {} }: DialogProps) => {
	const ref = useRef<HTMLDivElement>(null);

	useClickOutside([ref], onClose);

	return isOpen ? (
		<div className={styles.backdrop}>
			<div className={className} style={style} ref={ref}>
				{children}
			</div>
		</div>
	) : null;
};
