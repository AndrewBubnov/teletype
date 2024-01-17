'use client';
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

export const HeroContainer = styled(Box)(() => ({
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	color: 'lightgray',
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

export const StyledTypography = styled(Typography)`
	font-size: 4rem;
	font-weight: 900;
	text-align: center;
	background-image: linear-gradient(45deg, blue, red, yellow);
	background-clip: text;
	background-size: 200% auto;
	color: transparent;
	animation: move 7s infinite;
	@keyframes move {
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0 50%;
		}
	}
`;

export const Author = styled(Typography)(() => ({
	position: 'fixed',
	bottom: '3%',
	right: '5%',
}));
export const StyledLabel = styled('label')`
	display: contents;

	&:nth-of-type(1) > div {
		padding-top: 0;
	}
`;
