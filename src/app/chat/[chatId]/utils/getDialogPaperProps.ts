export const getDialogPaperProps = (width: number, aspectRatio: number, raised: boolean) => ({
	height: width / aspectRatio,
	...(raised ? { transform: 'translateY(-25%)' } : {}),
});
