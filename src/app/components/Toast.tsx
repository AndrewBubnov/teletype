import { useEffect } from 'react';
import { clsx } from 'clsx';
import { useAnimate } from '@/app/shared/hooks/useAnimate';
import { IoCloseOutline as CloseIcon } from 'react-icons/io5';
import { ToastProps } from '@/types';
import styles from '../home.module.css';

export const Toast = ({ onClose, context }: ToastProps) => {
	const { isActive, closeHandler, onCloseReturn } = useAnimate(onClose);

	useEffect(() => {
		setTimeout(closeHandler, 3000);
	}, [closeHandler]);

	return (
		<div
			className={clsx(styles.toast, {
				[styles.toastIn]: isActive,
				[styles.toastOut]: !isActive,
			})}
			onTransitionEnd={onCloseReturn}
			onClick={closeHandler}
		>
			<div>{context.text}&nbsp;</div>
			<button className={styles.toastButton}>
				<CloseIcon />
			</button>
		</div>
	);
};
