import { useCallback, useEffect, useState } from 'react';

export const useMenuAnimate = (callback: () => void) => {
	const [isActive, setIsActive] = useState<boolean>(false);

	useEffect(() => setIsActive(true), []);

	const animationStartHandler = useCallback(() => setIsActive(false), []);

	const closeHandler = useCallback(() => {
		if (!isActive) callback();
	}, [callback, isActive]);

	return { isActive, animationStartHandler, closeHandler };
};
