import { CSSProperties, ReactNode } from 'react';
import { useIsWideModeStore, useLeftSideWidthStore } from '@/store';
import { clsx } from 'clsx';
import styles from './LeftSideResizable.module.css';

export const LeftSideResizable = ({ children }: { children: ReactNode }) => {
	const isWideMode = useIsWideModeStore(state => state.isWideMode);
	const leftSideWidth = useLeftSideWidthStore(state => state.leftSideWidth);

	return (
		<div
			className={clsx({ [styles.inWideMode]: isWideMode, [styles.inNarrowMode]: !isWideMode })}
			style={{ '--left-width': `${leftSideWidth}%` } as CSSProperties}
		>
			{children}
		</div>
	);
};
