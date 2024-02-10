import { ReactNode, useEffect, useRef } from 'react';
import { clsx } from 'clsx';
import { IoCloseOutline as CloseIcon } from 'react-icons/io5';
import styles from '../chat.module.css';

export const SideDrawer = ({
	children,
	isOpen,
	onClose,
}: {
	children: ReactNode;
	isOpen: boolean;
	onClose(): void;
}) => {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!ref.current) return;
		const handler = (evt: PointerEvent) => {
			if (ref.current?.contains(evt.target as Node)) return;
			onClose();
		};
		document.addEventListener('pointerdown', handler);
		return () => document.removeEventListener('pointerdown', handler);
	}, [onClose]);

	return (
		<div className={clsx(styles.drawer, { [styles.open]: isOpen })} ref={ref}>
			<div>
				<button className={clsx(styles.iconButton, styles.closeDrawerIcon)} onClick={onClose}>
					<CloseIcon />
				</button>
			</div>
			{children}
		</div>
	);
};
