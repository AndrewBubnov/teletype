export const getAspectRatio = (base64Image: string): Promise<number> => {
	const img = new Image();
	img.src = base64Image;
	return new Promise<number>(resolve => (img.onload = () => resolve(img.width / img.height)));
};
