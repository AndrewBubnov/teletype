import { ChangeEvent, useCallback, useState } from 'react';
import { useCommonStore } from '@/store';
import { fileInputHelper } from '@/app/chat-list/[chatId]/utils/fileInputHelper';
import { MAX_FILE_SIZE } from '@/app/chat-list/[chatId]/constants';
import { UPLOAD_FILE_ERROR_MESSAGE } from '@/app/profile/constants';

export const useFileUpload = () => {
	const setToast = useCommonStore(state => state.setErrorToastText);

	const [imageUrl, setImageUrl] = useState<string | null>(null);

	const selectFileHandler = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			if ((event.target.files?.[0].size || 0) > MAX_FILE_SIZE) {
				setToast(UPLOAD_FILE_ERROR_MESSAGE);
				event.target.value = '';
				return;
			}
			fileInputHelper(event, (imgUrl: string) => setImageUrl(imgUrl));
		},
		[setToast]
	);

	const dropImageUrl = useCallback(() => setImageUrl(null), []);

	return { imageUrl, setImageUrl, selectFileHandler, dropImageUrl };
};
