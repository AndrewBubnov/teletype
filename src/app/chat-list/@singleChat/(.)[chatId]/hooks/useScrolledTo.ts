import { useEffect, useRef } from 'react';

export const useScrolledTo = (unreadNumber: number) => {
	const unreadRef = useRef(unreadNumber);

	useEffect(() => {
		if (!unreadNumber) {
			unreadRef.current = 0;
		}
	}, [unreadNumber]);

	return unreadRef.current;
};
