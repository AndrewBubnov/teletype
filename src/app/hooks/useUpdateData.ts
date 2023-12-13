import { useEffect, useState } from 'react';

export const useUpdateData = <T>(fn: (fn1: (arg: T) => void) => void, initValue: T) => {
	const [data, setData] = useState<T>(initValue);

	useEffect(() => {
		fn((value: T) => setData(value));
	}, [fn]);

	return data;
};
