import { ChangeEvent, useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { StyledBlackCheckbox, StyledButton, StyledDialogContentText } from '@/app/chat/[chatId]/styled';
import { ConfirmDialogProps } from '@/types';
import { DELETE_MULTIPLE_MESSAGE, DELETE_SINGLE_MESSAGE } from '@/app/chat/[chatId]/constants';

export const ConfirmDialog = ({ open, onCancel, onConfirm, interlocutorName, isMultiple }: ConfirmDialogProps) => {
	const [deleteBoth, setDeleteBoth] = useState(false);
	const [enter, setEnter] = useState<boolean>(false);
	const changeHandler = (event: ChangeEvent<HTMLInputElement>) => setDeleteBoth(event.target.checked);
	const backdropPressHandler = () => {
		if (!enter) onCancel();
	};
	const deleteHandler = () => {
		onConfirm(deleteBoth);
		onCancel();
	};

	return (
		<Dialog
			open={open}
			onTransitionEnter={() => setEnter(true)}
			onTransitionEnd={() => setEnter(false)}
			onClose={backdropPressHandler}
		>
			<DialogTitle>{`Delete message${isMultiple ? 's' : ''}`}</DialogTitle>
			<DialogContent>
				<DialogContentText>{isMultiple ? DELETE_MULTIPLE_MESSAGE : DELETE_SINGLE_MESSAGE}</DialogContentText>
				<StyledDialogContentText>
					<StyledBlackCheckbox checked={deleteBoth} onChange={changeHandler} />
					also delete for {interlocutorName}
				</StyledDialogContentText>
			</DialogContent>
			<DialogActions>
				<StyledButton size="small" variant="text" onClick={onCancel}>
					Cancel
				</StyledButton>
				<StyledButton size="small" variant="text" onClick={deleteHandler} textColor="red">
					Delete
				</StyledButton>
			</DialogActions>
		</Dialog>
	);
};
