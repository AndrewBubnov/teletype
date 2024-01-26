import { ChangeEvent, useState } from 'react';
import { clsx } from 'clsx';
import { StyledCheckbox } from '@/app/shared/components/StyledCheckbox';
import { Dialog } from '@/app/chat/[chatId]/components/Dialog';
import styles from '../chatId.module.css';
import { DELETE_MULTIPLE_MESSAGE, DELETE_SINGLE_MESSAGE } from '@/app/chat/[chatId]/constants';
import { ConfirmDialogProps } from '@/types';

export const ConfirmDialog = ({ open, onCancel, onConfirm, interlocutorName, isMultiple }: ConfirmDialogProps) => {
	const [deleteBoth, setDeleteBoth] = useState(false);
	const changeHandler = (event: ChangeEvent<HTMLInputElement>) => setDeleteBoth(event.target.checked);
	const deleteHandler = () => {
		onConfirm(deleteBoth);
		onCancel();
	};

	return (
		<Dialog isOpen={open} className={styles.confirmDialog} onClose={onCancel}>
			<h3 className={styles.confirmDialogHeader}>{`Delete message${isMultiple ? 's' : ''}`}</h3>
			<p>{isMultiple ? DELETE_MULTIPLE_MESSAGE : DELETE_SINGLE_MESSAGE}</p>
			<p>
				<StyledCheckbox
					checked={deleteBoth}
					onChange={changeHandler}
					className={styles.black}
					label={`also delete for ${interlocutorName}`}
					id="black_checkbox"
				/>
			</p>
			<div className={styles.confirmDialogContainer}>
				<button className={styles.confirmDialogButton} onClick={onCancel}>
					Cancel
				</button>
				<button className={clsx(styles.confirmDialogButton, styles.deleteButton)} onClick={deleteHandler}>
					Delete
				</button>
			</div>
		</Dialog>
	);
};
