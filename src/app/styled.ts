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
export const LogLinkWrapper = styled(Box)`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 40%;
	opacity: 0;
	animation: enter 2s 0.8s forwards;
	@keyframes enter {
		to {
			opacity: 1;
		}
	}
	@media (max-width: 600px) {
		width: 80%;
	}
`;

export const StyledTypography = styled(Typography)(() => ({
	fontSize: '3.5rem',
	fontWeight: 900,
	textAlign: 'center',
	backgroundImage: 'linear-gradient(45deg, red, blue)',
	backgroundClip: 'text',
	color: 'transparent',
}));

export const Author = styled(Typography)(() => ({
	position: 'fixed',
	bottom: '3%',
	right: '5%',
}));
