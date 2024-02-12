import { Message } from '@/types';

export const downloadImage = (message?: Message) => {
	if (!message?.imageUrl) return;
	const link = document.createElement('a');
	link.download = 'image.jpg';
	link.href = message.imageUrl;
	link.click();
};
