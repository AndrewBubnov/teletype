import { SyntheticEvent, useCallback, useState } from 'react';

export const useDeleteDialog = () => {
	const [dialogOpen, setDialogOpen] = useState<boolean>(false);

	const deleteMessageHandler = useCallback((evt: SyntheticEvent) => {
		evt.stopPropagation();
		setDialogOpen(true);
	}, []);

	const closeDialogHandler = useCallback(() => setDialogOpen(false), []);

	return { dialogOpen, deleteMessageHandler, closeDialogHandler };
};
