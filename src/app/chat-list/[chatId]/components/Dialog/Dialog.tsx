import { useRef } from 'react';
import { useClickOutside } from '@/app/shared/hooks/useClickOutside';
import { useEscapeKey } from '@/app/chat-list/[chatId]/hooks/useEscapeKey';
import { DialogProps } from '@/types';
import styles from './Dialog.module.css';

export const Dialog = ({ children, isOpen, onClose, className = '', style = {} }: DialogProps) => {
	const ref = useRef<HTMLDivElement>(null);

	useClickOutside([ref], onClose);

	useEscapeKey(onClose);

	return isOpen ? (
		<div className={styles.backdrop}>
			<div className={className} style={style} ref={ref}>
				{children}
			</div>
		</div>
	) : null;
};
