import { useEffect } from 'react';
import { sendPing } from '@/utils/sendPing';

const UNSLEEP_DELAY = 60_000 * 14;

export const useUnSleep = () => {
	useEffect(() => {
		const interval = setInterval(sendPing, UNSLEEP_DELAY);
		return () => clearInterval(interval);
	}, []);
};
