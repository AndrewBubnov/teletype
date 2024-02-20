import { AspectRatioAndWidth } from '@/types';

export const getAspectRatioAndWidth = (base64Image: string) => {
	const img = new Image();
	img.src = base64Image;
	return new Promise<AspectRatioAndWidth>(
		resolve => (img.onload = () => resolve({ width: img.width, aspectRatio: img.width / img.height }))
	);
};
