'use client';
import { styled } from '@mui/material/styles';
import Image, { ImageProps } from 'next/image';
import { Box, BoxProps, List, ListItem, TextField, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/PersonOutlineOutlined';
import SearchMuiIcon from '@mui/icons-material/Search';
import LogoutMuiIcon from '@mui/icons-material/Logout';
import CloseMUIIcon from '@mui/icons-material/Close';
import Menu from '@mui/icons-material/Menu';
import { ChatListItemInnerWrapperProps, ChatListWrapperProps, UserPhotoImageProps, UserPhotoStubProps } from '@/types';
import Link from 'next/link';

export const UserPhotoImage = styled(({ size = 50, ...props }: UserPhotoImageProps) => (
	<Image width={size} height={size} {...props} alt={props.alt} quality={100} />
))`
	border-radius: 50%;
	margin-right: 0.5rem;
	object-fit: cover;
`;

export const MicroPreviewImage = styled((props: ImageProps) => (
	<Image width={25} height={25} {...props} alt={props.alt} quality={80} />
))`
	border-radius: 0.25rem;
	object-fit: cover;
`;

export const UserPhotoStub = styled(({ size = 50, ...props }: UserPhotoStubProps) => <Box {...props} />)`
	display: flex;
	justify-content: center;
	align-items: center;
	width: ${({ size }) => `${size}px`};
	height: ${({ size }) => `${size}px`};
	background: #708090ff;
	color: #fff;
	border-radius: 50%;
	margin-right: 0.5rem;
`;

export const ActiveWrapper = styled(Box)`
	position: relative;
`;
export const Active = styled(Box)`
	position: absolute;
	bottom: 12%;
	right: 12%;
	width: 0.7rem;
	height: 0.7rem;
	background: #00be00;
	border-radius: 50%;
	animation: pulse 8s infinite;

	@keyframes pulse {
		0% {
			scale: 0.8;
			box-shadow: 0 0 0 0 darkgreen;
		}
		50% {
			scale: 1;
		}
		100% {
			scale: 0.8;
			box-shadow: 0 0 0 0.25rem rgba(0, 100, 0, 0);
		}
	}
`;

export const ChatListWrapper = styled(({ isSelectMode, ...props }: ChatListWrapperProps) => <Box {...props} />)`
	display: grid;
	gap: 1rem;
	grid-template-columns: ${({ isSelectMode }) => (isSelectMode ? 'auto 40px' : 'auto')};
	grid-template-rows: auto 1fr;
`;

export const UserWrapper = styled(Box)({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
});

export const LastMessageWrapper = styled(Box)({
	display: 'flex',
	alignItems: 'center',
	gap: '0.5rem',
	maxWidth: 'calc(100% - 1.5rem)',
	paddingLeft: '0.75rem',
});

export const ChatListItemMessageText = styled(Typography)({
	textOverflow: 'ellipsis',
	whiteSpace: 'nowrap',
	overflow: 'hidden',
});

export const ChatListItemUsername = styled(Typography)({
	textOverflow: 'ellipsis',
	whiteSpace: 'nowrap',
	overflow: 'hidden',
	userSelect: 'none',
});

export const ChatListItemDateWrapper = styled(Box)(() => ({
	fontSize: '0.7rem',
}));

export const ChatListItemInnerWrapper = styled(({ isDeleteMode, ...props }: ChatListItemInnerWrapperProps) => (
	<Box {...props} />
))`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	border-bottom: 1px solid #464545;
	padding-bottom: 1rem;
	width: ${({ isDeleteMode }) => (isDeleteMode ? '80vw' : '95vw')};
`;

export const ChatUnreadMessages = styled(Box)(() => ({
	width: '1.5rem',
	height: '1.5rem',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	background: 'darkgrey',
	borderRadius: '50%',
	color: '#ffffff',
	fontSize: '0.8rem',
	fontWeight: 600,
}));
export const UserNameWrapper = styled(Box)(() => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	maxWidth: '85%',
}));

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
