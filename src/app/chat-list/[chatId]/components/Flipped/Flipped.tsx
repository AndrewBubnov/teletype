import { AnimationEvent, ReactNode, useEffect, useState } from 'react';
import { clsx } from 'clsx';
import { FlippedProps } from '@/types';
import styles from '@/app/chat-list/[chatId]/components/Flipped/Flipped.module.css';

export const Flipped = ({ children, className = '' }: FlippedProps) => {
	const [updatedChildren, setUpdatedChildren] = useState<ReactNode>(children);
	const [isRotatedFirstHalf, setIsRotatedFirstHalf] = useState<boolean>(false);
	const [isRotatedSecondHalf, setIsRotatedSecondHalf] = useState<boolean>(false);

	useEffect(() => setIsRotatedFirstHalf(true), [children]);

	const onAnimationEnd = (evt: AnimationEvent<HTMLDivElement>) => {
		if (evt.animationName.includes('first')) {
			setIsRotatedFirstHalf(false);
			setUpdatedChildren(children);
			setIsRotatedSecondHalf(true);
		} else {
			setIsRotatedSecondHalf(false);
		}
	};

	return (
		<div
			className={clsx(className, {
				[styles.rotatedFirstHalf]: isRotatedFirstHalf,
				[styles.rotatedSecondHalf]: isRotatedSecondHalf,
			})}
			onAnimationEnd={onAnimationEnd}
		>
			<div className={clsx({ [styles.rotatedSecondHalf]: isRotatedSecondHalf })}>{updatedChildren}</div>
		</div>
	);
};
