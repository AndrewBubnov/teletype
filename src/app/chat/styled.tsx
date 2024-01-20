'use client';
import { styled } from '@mui/material/styles';
import Image, { ImageProps } from 'next/image';
import { Box, TextField, Typography } from '@mui/material';
import CloseMUIIcon from '@mui/icons-material/Close';
import { ChatListWrapperProps, UserPhotoImageProps } from '@/types';

export const UserPhotoImage = styled(({ size = 50, ...props }: UserPhotoImageProps) => (
	<Image width={size} height={size} {...props} alt={props.alt} quality={100} />
))`
	border-radius: 50%;
	margin-right: 0.5rem;
	object-fit: cover;
`;

export const ChatListWrapper = styled(({ isSelectMode, ...props }: ChatListWrapperProps) => <Box {...props} />)`
	display: grid;
	gap: 1rem;
	grid-template-columns: ${({ isSelectMode }) => (isSelectMode ? 'auto 40px' : 'auto')};
	grid-template-rows: auto 1fr;
`;

export const CloseIcon = styled(CloseMUIIcon)(() => ({
	fill: '#fff',
}));

export const StyledInput = styled(TextField)({
	'width': '100%',
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
