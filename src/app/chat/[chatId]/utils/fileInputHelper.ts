import { ChangeEvent } from 'react';

export const fileInputHelper = (event: ChangeEvent<HTMLInputElement>, callback: (arg: string) => void) => {
	const file = event.target.files?.[0];
	if (!file) return;
	const reader = new FileReader();

	reader.onload = async upload => {
		const base64Image = upload.target?.result;
		if (typeof base64Image !== 'string') return;
		callback(base64Image);
		event.target.value = '';
	};
	reader.readAsDataURL(file);
};
