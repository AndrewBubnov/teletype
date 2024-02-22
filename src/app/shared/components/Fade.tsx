import { cloneElement, createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { clsx } from 'clsx';
import { FadeContextProps, FadeProps, FadeProviderProps } from '@/types';
import styles from '../shared.module.css';

export const FadeContext = createContext<FadeContextProps>({} as FadeContextProps);

const FadeProvider = ({ children, onTransitionEnd }: FadeProviderProps) => (
	<FadeContext.Provider value={{ onTransitionEnd }}>{children}</FadeContext.Provider>
);

export const Fade = ({ children, isShown, className = '' }: FadeProps) => {
	const [isRendered, setIsRendered] = useState<boolean>(isShown);
	const [isActive, setIsActive] = useState(false);

	useEffect(() => {
		if (isShown && !isActive) {
			setIsRendered(true);
			setTimeout(() => setIsActive(true), 5);
		}
		if (!isShown) setIsActive(false);
	}, [isActive, isShown]);

	const classNameString = useMemo(
		() =>
			clsx(styles.fade, className, {
				[styles.fadeIn]: isActive,
				[styles.fadeOut]: !isActive,
			}),
		[className, isActive]
	);

	const onTransitionEnd = useCallback(() => {
		if (!isActive) setIsRendered(false);
	}, [isActive]);

	if (!isRendered) return null;

	return (
		<FadeProvider onTransitionEnd={onTransitionEnd}>
			{cloneElement(children, { className: classNameString, onTransitionEnd })}
		</FadeProvider>
	);
};
