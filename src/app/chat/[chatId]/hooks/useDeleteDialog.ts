import { SyntheticEvent, useState } from 'react';

export const useDeleteDialog = () => {
	const [dialogOpen, setDialogOpen] = useState<boolean>(false);
	const deleteMessageHandler = (evt: SyntheticEvent) => {
		evt.stopPropagation();
		setDialogOpen(true);
	};
	const closeDialogHandler = () => setDialogOpen(false);

	return { dialogOpen, deleteMessageHandler, closeDialogHandler };
};
