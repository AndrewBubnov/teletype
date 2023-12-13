'use client';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import { Box, Checkbox, TextField, Typography } from '@mui/material';
import { UserPhotoImageProps, UserPhotoStubProps } from '@/types';

export const UserPhotoImage = styled(({ isActive = false, size = 50, ...props }: UserPhotoImageProps) => (
	<Image width={size} height={size} {...props} alt={props.alt} />
))`
	position: relative;
	border-radius: 50%;
	margin-right: 0.5rem;
	object-fit: cover;
	box-sizing: border-box;
	border: ${({ isActive }) => (isActive ? '3px solid green' : 'none')};
`;

export const UserPhotoStub = styled(({ isActive, ...props }: UserPhotoStubProps) => <Box {...props} />)`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 50px;
	height: 50px;
	background: #708090ff;
	color: #fff;
	border-radius: 50%;
	margin-right: 0.5rem;
	border: ${({ isActive }) => (isActive ? '3px solid green' : 'none')};
`;

export const StyledCheckbox = styled(Checkbox)`
	color: #fff;

	&.Mui-checked {
		color: #fff;
	}
`;

export const StyledInput = styled(TextField)({
	'& label': {
		color: 'lightgray',
	},
	'& label.Mui-focused': {
		color: '#fff',
	},
	'& .MuiOutlinedInput-root': {
		'color': '#fff',
		'& fieldset': {
			borderColor: 'lightgray',
		},
		'&:hover fieldset': {
			borderColor: '#fff',
		},
		'&.Mui-focused fieldset': {
			borderColor: '#fff',
		},
		'.MuiSvgIcon-root': {
			fill: 'lightgray',
		},
	},
});
export const Wrapper = styled(Box)({
	padding: '0.5rem',
});
export const UserWrapper = styled(Box)({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	padding: '1rem',
	cursor: 'pointer',
	width: '90%',
});

export const UserNameWrapper = styled(Typography)({
	textOverflow: 'ellipsis',
	whiteSpace: 'nowrap',
	overflow: 'hidden',
});
export const HeaderContainer = styled(Box)(() => ({
	position: 'fixed',
	display: 'flex',
	flexDirection: 'row-reverse',
	alignItems: 'center',
	width: '100%',
	height: '3.5rem',
	padding: '0px 1rem',
}));
export const UserButtonWrapper = styled(Box)(() => ({
	width: '2rem',
	height: '2rem',
	marginRight: '0.5rem',
}));
