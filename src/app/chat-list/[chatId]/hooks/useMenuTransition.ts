import { useEffect, useRef, useState } from 'react';

export const useMenuTransition = () => {
	const [menuTop, setMenuTop] = useState<number>(0);

	const messageParams = useRef<DOMRect | null>(null);
	const initMenuParams = useRef<DOMRect | null>(null);

	useEffect(() => {
		const messageTop = messageParams.current?.top || 0;
		const messageHeight = messageParams.current?.height || 0;
		const menuHeight = initMenuParams.current?.height || 0;
		setMenuTop(messageTop - (menuHeight - messageHeight) / 2);
	}, [messageParams.current?.top, messageParams.current?.height]);

	return { menuTop, messageParams, initMenuParams };
};
