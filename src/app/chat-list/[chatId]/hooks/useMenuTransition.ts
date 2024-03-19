import { useEffect, useRef, useState } from 'react';

export const useMenuTransition = () => {
	const [menuTop, setMenuTop] = useState<number>(0);
	const [messageParams, setMessageParams] = useState<DOMRect | null>(null);

	const initMenuParams = useRef<DOMRect | null>(null);
	const wrapperRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!messageParams) return;
		const wrapperTop = wrapperRef.current?.getBoundingClientRect().top || 0;
		const messageTop = messageParams?.top || 0;
		const messageHeight = messageParams?.height || 0;
		const menuHeight = initMenuParams.current?.height || 0;
		setMenuTop(messageTop - wrapperTop - (menuHeight - messageHeight) / 2);
	}, [messageParams]);

	return { menuTop, setMessageParams, initMenuParams, wrapperRef };
};
