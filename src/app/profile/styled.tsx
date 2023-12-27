'use client';
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

export const LoaderWrapper = styled(Box)(() => ({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	height: '70vh',
}));

export const ControlsWrapper = styled(Box)(() => ({
	width: '75%',
	margin: '2rem auto',
}));

export const ButtonsWrapper = styled(Box)(() => ({
	display: 'flex',
	width: '100%',
	justifyContent: 'space-between',
	marginBottom: '2rem',
}));

export const StyledTypography = styled(Typography)(() => ({
	textAlign: 'center',
}));

export const LoadingIndicator = styled(Box)`
	width: 48px;
	height: 48px;
	border-radius: 50%;
	display: inline-block;
	border-top: 3px solid #fff;
	border-right: 3px solid transparent;
	box-sizing: border-box;
	animation: rotation 1s linear infinite;

	@keyframes rotation {
		to {
			transform: rotate(360deg);
		}
	}
`;
