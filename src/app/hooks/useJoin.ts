import { useUser } from '@clerk/nextjs';
import { useEffect } from 'react';
import { sendJoin } from '@/utils/sendJoin';

export const useJoin = () => {
	const user = useUser();

	useEffect(() => {
		if (user.user?.id) sendJoin(user.user?.id);
	}, [user.user?.id]);
};
