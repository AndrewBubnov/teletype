import { useCallback, useEffect, useState } from 'react';

export const useAnimate = (callback: () => void) => {
	const [isActive, setIsActive] = useState<boolean>(false);

	useEffect(() => setIsActive(true), []);

	const closeHandler = useCallback(() => setIsActive(false), []);

	const onCloseReturn = useCallback(() => {
		if (!isActive) callback();
	}, [callback, isActive]);

	return { isActive, closeHandler, onCloseReturn };
};
