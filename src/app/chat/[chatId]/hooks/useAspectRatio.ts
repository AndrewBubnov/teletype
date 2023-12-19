import { useEffect, useState } from 'react';
import { MessageType } from '@/types';
import { getAspectRatio } from '@/app/chat/[chatId]/utils/getAspectRatio';

export const useAspectRatio = (url: string | null, type: MessageType) => {
	const [aspectRatio, setAspectRatio] = useState<number>(1);

	useEffect(() => {
		if (type === MessageType.IMAGE && url) getAspectRatio(url).then(ar => setAspectRatio(ar));
	}, [url, type]);

	return aspectRatio;
};
