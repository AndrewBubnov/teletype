import { ChangeEvent, useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { StyledBlackCheckbox, StyledButton, StyledDialogContentText } from '@/app/chat/[chatId]/styled';

interface ConfirmDialogProps {
	open: boolean;
	onCancel(): void;
	onConfirm: (arg: boolean) => () => void;
	interlocutorName: string;
}

export const ConfirmDialog = ({ open, onCancel, onConfirm, interlocutorName }: ConfirmDialogProps) => {
	const [deleteBoth, setDeleteBoth] = useState(false);
	const [enter, setEnter] = useState(false);
	const changeHandler = (event: ChangeEvent<HTMLInputElement>) => setDeleteBoth(event.target.checked);
	const backdropPressHandler = () => {
		if (!enter) onCancel();
	};
	return (
		<Dialog
			open={open}
			onTransitionEnter={() => setEnter(true)}
			onTransitionEnd={() => setEnter(false)}
			onClose={backdropPressHandler}
		>
			<DialogTitle>Delete message</DialogTitle>
			<DialogContent>
				<DialogContentText>Are you sure you want to delete this message?</DialogContentText>
				<StyledDialogContentText>
					<StyledBlackCheckbox checked={deleteBoth} onChange={changeHandler} />
					Also delete for {interlocutorName}
				</StyledDialogContentText>
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
