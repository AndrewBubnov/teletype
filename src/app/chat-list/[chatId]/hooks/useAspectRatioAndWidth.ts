import { useEffect, useState } from 'react';
import { getAspectRatioAndWidth } from '@/app/chat-list/[chatId]/utils/getAspectRatioAndWidth';
import { DEFAULT_IMAGE_WIDTH } from '@/app/chat-list/[chatId]/constants';
import { AspectRatioAndWidth } from '@/types';

export const useAspectRatioAndWidth = (url: string | null | undefined) => {
	const [aspectRatio, setAspectRatio] = useState<AspectRatioAndWidth>({ width: DEFAULT_IMAGE_WIDTH, aspectRatio: 1 });

	useEffect(() => {
		if (url) getAspectRatioAndWidth(url).then(ar => setAspectRatio(ar));
	}, [url]);

	return aspectRatio;
};
