import { useEffect, useRef, useState } from 'react';

export const useMenuTransition = (menuActiveId: string) => {
	const [menuTop, setMenuTop] = useState<number>(0);
	const [messageParams, setMessageParams] = useState<DOMRect | null>(null);

	const initMenuParams = useRef<DOMRect | null>(null);

	useEffect(() => {
		if (!menuActiveId) return;
		const messageTop = messageParams?.top || 0;
		const messageHeight = messageParams?.height || 0;
		const menuHeight = initMenuParams.current?.height || 0;
		setMenuTop(messageTop - (menuHeight - messageHeight) / 2);
	}, [menuActiveId, messageParams?.top, messageParams?.height]);

	return { menuTop, setMessageParams, initMenuParams };
};
