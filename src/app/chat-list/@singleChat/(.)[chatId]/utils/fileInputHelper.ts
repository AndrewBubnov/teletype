import { ChangeEvent } from 'react';

export const fileInputHelper = (event: ChangeEvent<HTMLInputElement>, callback: (arg: string) => void) => {
	const file = event.target.files?.[0];
	if (!file) return;
	const reader = new FileReader();

	reader.onload = async upload => {
		const base64Image = upload.target?.result;

		if (typeof base64Image !== 'string') return;

		const img = new Image();
		img.src = base64Image;
		img.onload = () => {
			const width = img.width;
			const height = img.height;
			const canvas = document.createElement('canvas');
			const ctx = canvas.getContext('2d');
			canvas.width = width;
			canvas.height = height;
			ctx?.drawImage(img, 0, 0, width, height);
			const base64Resized = canvas.toDataURL('image/jpeg', 0.65);
			callback(base64Resized);
		};
		event.target.value = '';
	};
	reader.readAsDataURL(file);
};
