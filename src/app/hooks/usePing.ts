import { useEffect } from 'react';
import { sendPing } from '@/utils/sendPing';

const delay = 60_000 * 14;

export const usePing = () => {
	useEffect(() => {
		setInterval(sendPing, delay);
		sendPing();
	}, []);
};
