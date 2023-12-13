'use client';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import Link from 'next/link';

export const HeroContainer = styled(Box)(() => ({
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	gap: '3rem',
	width: '100%',
	height: '100%',
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
export const LogLink = styled(Link)(() => ({
	'fontSize': '1.5rem',
	'textDecoration': 'none',
	'padding': '10px 20px',
	'background': 'steelblue',
	'transition': 'color .3s',
	'borderRadius': 4,
	'color': 'lightgray',
	'&:hover': {
		color: '#fff',
	},
}));
