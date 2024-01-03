export const getDialogPaperProps = (width: number, aspectRatio: number, raised: boolean) => ({
	style: { height: width / aspectRatio, ...(raised ? { transform: 'translateY(-25%)' } : {}) },
});
