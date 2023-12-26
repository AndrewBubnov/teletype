import { Area } from 'react-easy-crop';
import { MAX_IMAGE_SIZE } from '@/app/profile/constants';

const createImage = (url: string): Promise<HTMLImageElement> =>
	new Promise((resolve, reject) => {
		const image = new Image();
		image.addEventListener('load', () => resolve(image));
		image.addEventListener('error', error => reject(error));
		image.setAttribute('crossOrigin', 'anonymous');
		image.src = url;
	});

const getRadianAngle = (degreeValue: number) => (degreeValue * Math.PI) / 180;

const rotateSize = (width: number, height: number, rotation: number) => {
	const rotRad = getRadianAngle(rotation);
	return {
		width: Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
		height: Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
	};
};

export const getCroppedImg = async (imageSrc: string | null, pixelCrop: Area, rotation = 0): Promise<string | null> => {
	if (!imageSrc) return null;

	const image = await createImage(imageSrc);
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');

	if (!ctx) return null;

	const rotRad = getRadianAngle(rotation);

	const { width: bBoxWidth, height: bBoxHeight } = rotateSize(image.width, image.height, rotation);

	canvas.width = Math.min(bBoxWidth, MAX_IMAGE_SIZE);
	canvas.height = Math.min(bBoxHeight, MAX_IMAGE_SIZE);

	ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
	ctx.rotate(rotRad);
	ctx.translate(-image.width / 2, -image.height / 2);

	ctx.drawImage(image, 0, 0);

	const data = ctx.getImageData(pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height);

	canvas.width = pixelCrop.width;
	canvas.height = pixelCrop.height;

	ctx.putImageData(data, 0, 0);

	return canvas.toDataURL();
};
