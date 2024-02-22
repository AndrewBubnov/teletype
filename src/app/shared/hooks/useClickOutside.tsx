import { RefObject, useEffect, useRef } from 'react';

export const useClickOutside = (refsArray: RefObject<HTMLElement>[], callback: () => void) => {
	const array = useRef(refsArray);

	useEffect(() => {
		const handler = (evt: PointerEvent) => {
			const target = evt.target as Node;
			if (array.current.some(el => el.current?.contains(target))) return;
			callback();
		};
		document.addEventListener('pointerdown', handler);
		return () => document.removeEventListener('pointerdown', handler);
	}, [callback]);
};
