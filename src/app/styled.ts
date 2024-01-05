'use client';
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';

export const HeroContainer = styled(Box)(() => ({
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	gap: '8rem',
	width: '100%',
	height: '100%',
	marginTop: '-3rem',
}));
export const LogLinkWrapper = styled(Box)(() => ({
	'display': 'flex',
	'alignItems': 'center',
	'justifyContent': 'space-between',
	'width': '40%',
	'@media (max-width: 600px)': {
		width: '80%',
	},
}));

export const StyledTypography = styled(Typography)(() => ({
	fontSize: '2.5rem',
	textAlign: 'center',
}));
