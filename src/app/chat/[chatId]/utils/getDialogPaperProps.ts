export const getDialogPaperProps = (width: number, aspectRatio: number) => ({
	style: { height: width / aspectRatio, transform: 'translateY(-50%)' },
});
