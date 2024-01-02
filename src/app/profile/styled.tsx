'use client';
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

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
