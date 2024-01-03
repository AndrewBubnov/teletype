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

export const Toast = ({ open, onClose, context }: ErrorToastProps) => {
	if (!context) return null;
	const handleClose = (_?: SyntheticEvent | Event, reason?: string) => {
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
			<Alert onClose={handleClose} severity={context.type} sx={{ width: '100%' }}>
				{context.text}
			</Alert>
		</Snackbar>
	);
};
