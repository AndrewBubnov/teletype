import { forwardRef, ReactElement, SyntheticEvent } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { ErrorToastProps } from '@/types';

const TransitionLeft = (props: TransitionProps) => (
	<Slide {...props} direction="left">
		{props.children as ReactElement}
	</Slide>
);

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const ErrorToast = ({ open, onClose, text }: ErrorToastProps) => {
	const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
		if (reason !== 'clickaway') onClose();
	};

	return (
		<Snackbar
			open={open}
			autoHideDuration={4000}
			onClose={handleClose}
			TransitionComponent={TransitionLeft}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'right',
			}}
		>
			<Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
				{text}
			</Alert>
		</Snackbar>
	);
};
