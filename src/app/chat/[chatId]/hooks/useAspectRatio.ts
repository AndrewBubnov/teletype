import { useEffect, useState } from 'react';
import { getAspectRatio } from '@/app/chat/[chatId]/utils/getAspectRatio';

export const useAspectRatio = (url: string | null | undefined) => {
	const [aspectRatio, setAspectRatio] = useState<number>(1);

	useEffect(() => {
		if (url) getAspectRatio(url).then(ar => setAspectRatio(ar));
	}, [url]);

	return aspectRatio;
};
