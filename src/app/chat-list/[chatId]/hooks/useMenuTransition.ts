import { useEffect, useLayoutEffect, useRef, useState } from 'react';

export const useMenuTransition = (menuActiveId: string, userId: string) => {
	const [menuTop, setMenuTop] = useState<number>(0);
	const [messageParams, setMessageParams] = useState<DOMRect | null>(null);

	const initMenuParams = useRef<DOMRect | null>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const containerParams = useRef<DOMRect | null>(null);

	useLayoutEffect(() => {
		if (!containerRef.current) return;
		containerParams.current = containerRef.current.getBoundingClientRect();
	}, [userId]);

	useEffect(() => {
		if (!menuActiveId) return;
		const messageTop = messageParams?.top || 0;
		const messageHeight = messageParams?.height || 0;
		const menuHeight = initMenuParams.current?.height || 0;
		const containerTop = containerParams.current?.top || 0;
		const containerHeight = containerParams.current?.height || 0;
		const relativeTop = messageTop - containerTop;
		setMenuTop(Math.min(Math.max(0, relativeTop - (menuHeight - messageHeight) / 2), containerHeight - menuHeight));
	}, [menuActiveId, messageParams?.top, messageParams?.height]);

	return { menuTop, setMessageParams, containerRef, initMenuParams };
};
