export const getImageWidth = ({
	aspectRatio,
	width,
	isWideMode,
}: {
	aspectRatio: number;
	width: number;
	isWideMode: boolean;
}) => {
	if (aspectRatio < 0) {
		return isWideMode ? Math.min(width, window.innerWidth * 0.75 * 0.75) : width;
	}
	const height = Math.min(width / aspectRatio, window.innerHeight * 0.75);
	return height * aspectRatio;
};
