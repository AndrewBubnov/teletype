'use client';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

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

export const StyledLabel = styled('label')`
	display: contents;

	&:nth-of-type(1) > div {
		padding-top: 0;
	}
`;
