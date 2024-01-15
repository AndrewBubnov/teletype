'use client';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import { Box, BoxProps, List, ListItem, TextField, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/PersonOutlineOutlined';
import SearchMuiIcon from '@mui/icons-material/Search';
import LogoutMuiIcon from '@mui/icons-material/Logout';
import CloseMUIIcon from '@mui/icons-material/Close';
import Menu from '@mui/icons-material/Menu';
import { ChatListItemInnerWrapperProps, ChatListWrapperProps, UserPhotoImageProps, UserPhotoStubProps } from '@/types';
import Link from 'next/link';

export const UserPhotoImage = styled(({ isActive = false, size = 50, ...props }: UserPhotoImageProps) => (
	<Image width={size} height={size} {...props} alt={props.alt} quality={100} />
))`
	border-radius: 50%;
	margin-right: 0.5rem;
	object-fit: cover;
	box-sizing: border-box;
	border: ${({ isActive }) => (isActive ? '3px solid green' : 'none')};
`;

export const UserPhotoStub = styled(({ isActive, size = 50, ...props }: UserPhotoStubProps) => <Box {...props} />)`
	display: flex;
	justify-content: center;
	align-items: center;
	width: ${({ size }) => `${size}px`};
	height: ${({ size }) => `${size}px`};
	background: #708090ff;
	color: #fff;
	border-radius: 50%;
	margin-right: 0.5rem;
	border: ${({ isActive }) => (isActive ? '3px solid green' : 'none')};
`;

export const Wrapper = styled(Box)({
	padding: '0.5rem',
});

export const ChatListWrapper = styled(({ isSelectMode, ...props }: ChatListWrapperProps) => <Box {...props} />)`
	display: grid;
	gap: 1rem;
	grid-template-columns: ${({ isSelectMode }) => (isSelectMode ? 'auto 40px' : 'auto')};
	grid-template-rows: auto 1fr;
`;

export const StyledLabel = styled('label')`
	display: contents;
`;
export const UserWrapper = styled(Box)({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
});
export const ChatListItemMessageText = styled(Typography)({
	textOverflow: 'ellipsis',
	whiteSpace: 'nowrap',
	overflow: 'hidden',
	maxWidth: 'calc(100% - 1em - 1rem)',
});

export const Italic = styled((props: BoxProps) => <Box {...props} component="span" />)({
	fontStyle: 'italic',
	color: 'palegoldenrod',
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

export const DrawerInnerWrapper = styled(Box)(() => ({
	height: '100%',
	background: '#333333FF',
	padding: '1rem',
	color: 'lightgray',
}));

export const NewChatMenuWrapper = styled(Box)(() => ({
	width: '100%',
}));

export const FlexCenterWrapper = styled(Box)(() => ({
	display: 'flex',
	alignItems: 'center',
}));

export const NewChatMenuInnerWrapper = styled(Box)(() => ({
	display: 'flex',
	alignItems: 'center',
	marginBottom: '0.5rem',
}));

export const DrawerList = styled(List)(() => ({
	marginTop: '3rem',
}));

export const DrawerListItem = styled(ListItem)(() => ({
	padding: '1rem 0',
	borderBottom: '1px solid #636363',
}));

export const ProfileIcon = styled(PersonIcon)(() => ({
	fill: 'lightgray',
	marginRight: '1rem',
}));

export const SearchIcon = styled(SearchMuiIcon)(() => ({
	fill: 'lightgray',
	marginRight: '1rem',
}));
export const MenuIcon = styled(Menu)(() => ({
	fill: 'lightgray',
	width: '2rem',
	height: '2rem',
}));

export const LogoutIcon = styled(LogoutMuiIcon)(() => ({
	fill: 'lightgray',
	marginRight: '1rem',
}));

export const CloseIcon = styled(CloseMUIIcon)(() => ({
	fill: '#fff',
}));

export const StyledLink = styled(Link)(() => ({
	display: 'flex',
	alignItems: 'center',
	color: 'lightgray',
	textDecoration: 'none',
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
