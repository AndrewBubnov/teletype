import { useEffect, useRef } from 'react';

export const useFirstLoad = <T>(callback: (arg: T) => void, value: T) => {
	const ref = useRef(value);

	useEffect(() => {
		callback(ref.current);
	}, [callback, ref]);
};
