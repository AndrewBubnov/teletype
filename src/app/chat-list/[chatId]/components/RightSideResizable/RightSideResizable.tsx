import { CSSProperties, ForwardedRef, forwardRef, ReactNode } from 'react';
import { useIsWideModeStore, useLeftSideWidthStore } from '@/store';
import { clsx } from 'clsx';
import styles from './RightSideResizable.module.css';

export const RightSideResizable = forwardRef(
	({ children }: { children: ReactNode }, ref: ForwardedRef<HTMLDivElement>) => {
		const isWideMode = useIsWideModeStore(state => state.isWideMode);
		const leftSideWidth = useLeftSideWidthStore(state => state.leftSideWidth);

		return (
			<div
				className={clsx(styles.chatContainer, {
					[styles.inWideMode]: isWideMode,
					[styles.inNarrowMode]: !isWideMode,
				})}
				ref={ref}
				style={{ '--right-width': `${100 - leftSideWidth}%` } as CSSProperties}
			>
				{children}
			</div>
		);
	}
);

RightSideResizable.displayName = 'RightSideResizable';
