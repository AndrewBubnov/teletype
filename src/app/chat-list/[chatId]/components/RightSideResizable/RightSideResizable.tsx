import { CSSProperties, ReactNode } from 'react';
import { useIsWideModeStore, useLeftSideWidthStore } from '@/store';
import { clsx } from 'clsx';
import styles from './RightSideResizable.module.css';

export const RightSideResizable = ({ children }: { children: ReactNode }) => {
	const isWideMode = useIsWideModeStore(state => state.isWideMode);
	const leftSideWidth = useLeftSideWidthStore(state => state.leftSideWidth);

	return (
		<div
			className={clsx(styles.chatContainer, {
				[styles.inWideMode]: isWideMode,
				[styles.inNarrowMode]: !isWideMode,
			})}
			style={{ '--right-width': `${100 - leftSideWidth}%` } as CSSProperties}
		>
			{children}
		</div>
	);
};
