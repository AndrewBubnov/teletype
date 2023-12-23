import { useEffect } from 'react';
import { Subscription } from '@/types';

export const useSubscribe = <T>(
	setter: (arg: T) => void,
	subscription: Subscription<T>,
	clearSubscription: Subscription<T>
) => {
	useEffect(() => {
		subscription(setter);
		return () => {
			clearSubscription(setter);
		};
	}, [subscription, clearSubscription, setter]);
};
