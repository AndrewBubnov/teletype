'use client';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import { Box, Button, Checkbox, DialogContentText, IconButton } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import FileDownloadIcon from '@mui/icons-material/FileDownloadOutlined';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ReplyIcon from '@mui/icons-material/ReplyOutlined';
import DownIcon from '@mui/icons-material/KeyboardArrowDown';
import CheckMUIIcon from '@mui/icons-material/Check';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import { InnerMessageBoxProps, MessageBoxProps, MessageItemBottomProps, StyledButtonProps } from '@/types';

export const UnreadNumberButton = styled(Button)`
	position: absolute;
	display: flex;
	flex-direction: column;
	align-items: center;
	bottom: 5%;
	right: 7%;
	animation: enter 1s;

	@keyframes enter {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
`;
export const UnreadNumber = styled(Box)`
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 0.8rem;
	font-weight: 500;
	min-width: 1.8rem;
	height: 1.8rem;
	padding: 0.2rem;
	background: darkgreen;
	color: #fff;
	border-radius: 0.9rem;
	z-index: 10;
`;
export const UnreadNumberIconWrapper = styled(Box)`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 2.5rem;
	height: 2.5rem;
	background: #fff;
	border-radius: 50%;
	margin-top: -0.5rem;
`;

export const UnreadNumberIcon = styled(DownIcon)`
	fill: darkgreen;
	margin-top: 3px;
`;
export const Backdrop = styled(Box)`
	position: absolute;
	display: flex;
	justify-content: center;
	z-index: 10;
	inset: 0;
	background: rgba(0, 0, 0, 0.3);
`;
export const MessageWrapper = styled(Box)`
	position: relative;
	user-select: none;
	display: flex;
	padding: 1rem 0;
`;
export const InnerMessageItem = styled(({ isAuthoredByUser, withPadding, ...props }: InnerMessageBoxProps) => (
	<Box {...props} />
))`
	padding: ${({ withPadding }) => (withPadding ? '0.5rem' : 0)};
	margin-top: 0.5rem;
	max-width: 100%;
	border-radius: 0.25rem;
	word-break: break-word;
`;

export const StyledImage = styled(Image)`
	display: block;
	object-fit: cover;
	border-radius: 0.25rem;
	width: 100%;
`;

export const StyledImageButton = styled(IconButton)`
	position: absolute;
	bottom: 2%;
	right: 3%;
	background: rgba(26, 26, 26, 0.6);
	padding: 6px;
`;

export const ImageWrapper = styled(Box)`
	position: relative;
`;
export const StyledCloseFullWidthIcon = styled(CloseFullscreenIcon)`
	width: 0.7em;
	height: 0.7em;
	fill: lightgray;
`;

export const MenuCard = styled(Box)`
	padding: 0.5rem;
	width: 40%;
	height: fit-content;
	background: lightgoldenrodyellow;
	border-radius: 0.25rem;
	color: #000;
	@media (max-width: 600px) {
		width: 60%;
	}
`;

export const StyledButton = styled(({ textColor, ...props }: StyledButtonProps) => <Button {...props} />)`
	text-transform: none;
	color: ${({ textColor }) => (textColor ? textColor : 'currentColor')};
`;

export const ReactionsWrapper = styled(Box)`
	display: flex;
	overflow-x: auto;
	font-size: 20px;
	padding-bottom: 0.25rem;
	user-select: none;

	&::-webkit-scrollbar {
		height: 6px;
	}

	&::-webkit-scrollbar-track {
		height: 6px;
		background-color: transparent;
		border: solid 1px transparent;
	}

	&::-webkit-scrollbar-thumb {
		background-color: rgba(70, 130, 180, 0.6);
		border: solid 1px transparent;
		border-radius: 6px;
		background-clip: padding-box;
	}

	@media (max-width: 600px) {
		&::-webkit-scrollbar {
			height: 3px;
		}
		&::-webkit-scrollbar-track {
			height: 3px;
		}
	}
`;

export const StyledBlackCheckbox = styled(Checkbox)`
	color: #1a1a1a;
	margin-left: -0.75rem;

	&.Mui-checked {
		color: #1a1a1a;
	}
`;

export const StyledDialogContentText = styled(DialogContentText)`
	color: #000;
`;
export const EditIcon = styled(ModeEditIcon)`
	fill: #1a1a1a;
`;

export const DownloadIcon = styled(FileDownloadIcon)`
	fill: #1a1a1a;
`;
export const CheckIcon = styled(CheckMUIIcon)`
	fill: #1a1a1a;
`;
export const MenuDeleteIcon = styled(DeleteOutlineIcon)`
	fill: #1a1a1a;
`;
export const MenuReplyIcon = styled(ReplyIcon)`
	fill: #000;
`;

export const StyledLink = styled('a')`
	color: lightgray;
`;
