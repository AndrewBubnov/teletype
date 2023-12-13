import { ChangeEvent, useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { StyledBlackCheckbox, StyledButton } from '@/app/chat/[chatId]/styled';

interface ConfirmDialogProps {
	open: boolean;
	onCancel(): void;
	onConfirm: (arg: boolean) => () => void;
	interlocutorName: string;
}

export const ConfirmDialog = ({ open, onCancel, onConfirm, interlocutorName }: ConfirmDialogProps) => {
	const [deleteBoth, setDeleteBoth] = useState(false);
	const changeHandler = (event: ChangeEvent<HTMLInputElement>) => setDeleteBoth(event.target.checked);
	return (
		<Dialog open={open} keepMounted onClose={onCancel}>
			<DialogTitle>Delete message</DialogTitle>
			<DialogContent>
				<DialogContentText>Are you sure you want to delete this message?</DialogContentText>
				<DialogContentText>
					<StyledBlackCheckbox checked={deleteBoth} onChange={changeHandler} />
					Also delete for {interlocutorName}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<StyledButton size="small" variant="text" onClick={onCancel}>
					Cancel
				</StyledButton>
				<StyledButton size="small" variant="text" onClick={onConfirm(deleteBoth)} textColor="red">
					Delete
				</StyledButton>
			</DialogActions>
		</Dialog>
	);
};
