'use client';
import { styled } from '@mui/material/styles';
import Image, { ImageProps } from 'next/image';
import {
	Box,
	Button,
	Checkbox,
	DialogContentText,
	IconButton,
	FormLabel,
	BoxProps,
	Dialog,
	Alert,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ReplyIcon from '@mui/icons-material/ReplyOutlined';
import DownIcon from '@mui/icons-material/KeyboardArrowDown';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import {
	ElapsedTimeWrapperProps,
	InnerMessageBoxProps,
	MessageBoxProps,
	MessageItemBottomProps,
	RepliedMessageTextProps,
	StyledButtonProps,
} from '@/types';
import { MAX_MESSAGE_WIDTH_RATIO } from '@/app/chat/[chatId]/constants';
import MuiAlert from '@mui/material/Alert';

export const ChatWrapper = styled(Box)`
	padding: 1rem;
	overflow-y: auto;
	overflow-x: hidden;
	height: 72vh;
	margin-top: 1rem;

	&::-webkit-scrollbar {
		width: 6px;
	}

	&::-webkit-scrollbar-track {
		width: 6px;
		background-color: transparent;
		border: solid 1px transparent;
	}

	&::-webkit-scrollbar-thumb {
		background-color: rgba(70, 130, 180, 0.6);
		border: solid 1px transparent;
		border-radius: 6px;
		background-clip: padding-box;
	}
`;

export const CoverWrapper = styled(Box)`
	position: relative;
`;
export const UploadLabel = styled(FormLabel)`
	margin-top: 0.5rem;
`;
export const RepliedMessageContainer = styled(Box)`
	display: flex;
	flex-direction: column;
	height: 3.5rem;
	color: #1a1a1a;
	margin-bottom: 3px;
`;
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
	width: 1.2rem;
	height: 1.2rem;
	background: darkgreen;
	color: #fff;
	border-radius: 50%;
	z-index: 10;
`;
export const UnreadNumberIconWrapper = styled(Box)`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 1.5rem;
	height: 1.5rem;
	background: #fff;
	border-radius: 50%;
	margin-top: -0.5rem;
`;

export const StartDecorator = styled(Box)`
	display: flex;
	flex: 1;
	justify-content: space-between;
`;

export const EndDecorator = styled(Box)`
	display: flex;
	flex: auto;
	gap: 0.5rem;
	align-items: flex-end;
	padding-top: 0.25rem;
	border-top: 1px solid;
	border-color: lightgray;
`;

export const UnreadNumberIcon = styled(DownIcon)`
	fill: darkgreen;
	margin-top: 3px;
`;

export const UploadFileIcon = styled(AttachFileIcon)`
	fill: lightgray;
`;
export const RepliedMessageAuthor = styled(Box)`
	flex: 1;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background: lightgreen;
	border-top-left-radius: 4px;
	border-top-right-radius: 4px;
	padding: 0 0.5rem;
`;
export const ImageIconsWrapper = styled(Box)`
	display: flex;
	justify-content: space-between;
	width: 12rem;
	margin-left: auto;
`;

export const ImageIconsInnerWrapper = styled(Box)`
	display: flex;
	justify-content: space-between;
	width: 8rem;
	margin-left: auto;
`;
export const ReplyToContainer = styled(Box)`
	background: palegreen;
	border-radius: 0.25rem;
	padding: 0.25rem;
	margin-bottom: 0.5rem;
`;
export const PreviewImageDialog = styled(Dialog)`
	position: relative;
`;
export const ReplyToAuthor = styled(Box)`
	font-size: 0.7rem;
	color: green;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	margin-bottom: 0.25rem;
`;
export const ReplyToText = styled(Box)`
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	color: #1a1a1a;
`;

export const ReplyToWrapper = styled(Box)`
	display: flex;
	max-width: 20rem;
`;
export const ReplyToDateWrapper = styled(Box)`
	display: flex;
	flex-direction: row-reverse;
`;
export const ReplyToDate = styled(Box)`
	font-size: 0.5rem;
	color: green;
`;
export const RepliedMessageAuthorInner = styled(Box)`
	display: flex;
	max-width: 85%;
	align-items: center;
`;
export const RepliedMessageText = styled(({ isMultiple, ...props }: RepliedMessageTextProps) => <Box {...props} />)`
	flex: 1;
	display: flex;
	justify-content: ${({ isMultiple }) => (isMultiple ? 'space-between' : 'flex-start')};
	align-items: center;
	background: lightgray;
	border-bottom-left-radius: 4px;
	border-bottom-right-radius: 4px;
	padding: 0 0.5rem;
`;

export const RepliedMessageImage = styled(Box)`
	margin-left: 0.5rem;
`;
export const RepliedMessageInner = styled(Box)`
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`;
export const RepliedTimeContainer = styled(Box)`
	display: flex;
	flex-direction: column-reverse;
	height: 80%;
	margin-left: 1rem;
	font-size: 0.6rem;
`;
export const DropReplyMessageButton = styled(IconButton)`
	padding: 0;
	margin-right: 1rem;
`;
export const Backdrop = styled(Box)`
	position: absolute;
	display: flex;
	justify-content: center;
	z-index: 10;
	inset: 0;
	background: rgba(0, 0, 0, 0.3);
`;
const MessageWrapper = styled(Box)`
	display: flex;
	padding: 1rem 0;
`;
export const AuthorMessageWrapper = styled(MessageWrapper)`
	position: relative;
	flex-direction: row-reverse;
`;
export const InterlocutorMessageWrapper = styled(MessageWrapper)`
	position: relative;
	flex-direction: row;
`;
export const MessageItem = styled(
	({ isAuthoredByUser, singlePadding, withOffset, fullWidth, transparent, ...props }: MessageBoxProps) => (
		<Box {...props} />
	)
)`
	position: relative;
	max-width: ${({ fullWidth }) => (fullWidth ? 'unset' : `${MAX_MESSAGE_WIDTH_RATIO * 100}%`)};
	width: ${({ fullWidth }) => (fullWidth ? '100%' : 'unset')};
	padding: ${({ singlePadding }) => (singlePadding ? '0 0 0.5rem 0' : '0.5rem')};
	margin-top: ${({ withOffset }) => (withOffset ? '0.5rem' : 0)};
	background: ${({ isAuthoredByUser, transparent }) => {
		if (transparent) return 'transparent';
		return isAuthoredByUser ? '#4682b499' : '#70809080';
	}};
	border-radius: 0.25rem;
`;

export const InnerMessageItem = styled(({ isAuthoredByUser, withPadding, ...props }: InnerMessageBoxProps) => (
	<Box {...props} />
))`
	padding: ${({ withPadding }) => (withPadding ? '0.5rem' : 0)};
	margin-top: 0.5rem;
	max-width: 100%;
	border-radius: 0.25rem;
`;

export const MessageItemBottom = styled(({ multipleChild, withOffset, ...props }: MessageItemBottomProps) => (
	<Box {...props} />
))`
	display: flex;
	gap: 1rem;
	flex-direction: ${({ multipleChild }) => (multipleChild ? 'row' : 'row-reverse')};
	margin: ${({ withOffset }) => (withOffset ? '0.5rem 0.5rem 0 0.5rem' : '0.5rem 0 0 0')};
	justify-content: space-between;
	align-items: flex-end;
`;

export const TimeWrapper = styled(Box)`
	font-size: 0.6rem;
	color: rgba(0, 210, 170, 0.8);
`;

export const ReactionWrapper = styled(Box)`
	display: flex;
	align-items: center;
	gap: 0.8rem;
	width: fit-content;
	background: rgba(26, 26, 26, 0.2);
	padding: 2px;
	border-radius: 1rem;
	font-size: 1rem;
`;

export const ReactionAuthorImage = styled((props: ImageProps) => <Image width={16} height={16} {...props} />)`
	border-radius: 50%;
	object-fit: cover;
`;
export const PreviewImage = styled((props: ImageProps) => <Image fill {...props} alt="preview" />)`
	object-fit: cover;
`;

export const StyledImage = styled(Image)`
	display: block;
	object-fit: cover;
	border-radius: 0.25rem;
`;

export const StyledImageButton = styled(IconButton)`
	position: absolute;
	bottom: 2%;
	right: 3%;
	background: rgba(26, 26, 26, 0.6);
	padding: 6px;
`;

export const BasicImageWrapper = styled(Box)`
	position: relative;
`;
export const StyledFullWidthIcon = styled(OpenInFullIcon)`
	width: 0.7em;
	height: 0.7em;
	fill: lightgray;
`;
export const StyledCloseFullWidthIcon = styled(CloseFullscreenIcon)`
	width: 0.7em;
	height: 0.7em;
	fill: lightgray;
`;
export const SendMessageFormWrapper = styled(Box)`
	width: 100%;
	padding: 0 1rem;
	position: fixed;
	bottom: 1rem;
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
	padding-left: 0;

	&.Mui-checked {
		color: #1a1a1a;
	}
`;

export const ChatsListHeader = styled(Box)`
	display: flex;
	flex-direction: row-reverse;
	margin-top: 1rem;
	height: 1.5rem;
`;
export const StyledDialogContentText = styled(DialogContentText)`
	color: #000;
`;
export const ChatsListDeleteButton = styled(IconButton)`
	padding: 9px;
`;
export const DeleteIcon = styled(DeleteOutlineIcon)`
	fill: #fff;
`;
export const EditIcon = styled(ModeEditIcon)`
	fill: #1a1a1a;
`;
export const StyledDeleteIcon = styled(DeleteOutlineIcon)`
	fill: lightgray;
`;
export const MenuDeleteIcon = styled(DeleteOutlineIcon)`
	fill: #1a1a1a;
`;
export const MenuReplyIcon = styled(ReplyIcon)`
	fill: #000;
`;

export const ChatHeaderWrapper = styled(Box)`
	display: flex;
	align-items: center;
	padding: 1.5rem 0 0 1rem;

	@media (max-width: 600px) {
		display: block;
	}
`;

export const CenterHorizontalWrapper = styled(Box)`
	display: flex;
	align-items: center;
`;
export const EmojiDisplayWrapper = styled(({ component, ...props }: BoxProps) => <Box component="span" {...props} />)`
	font-size: 2.5rem;
`;
export const StyledBackIcon = styled(ArrowBackIcon)`
	fill: #fff;
	margin-right: 1rem;
	margin-left: -0.5rem;
`;

export const ElapsedTimeWrapper = styled(({ color, ...props }: ElapsedTimeWrapperProps) => <Box {...props} />)`
	margin-left: 3rem;
	color: ${({ color }) => color};

	@media (max-width: 600px) {
		margin-left: 0;
		margin-top: 0.5rem;
	}
`;

export const SendButton = styled(Button)`
	text-transform: none;
	background-color: rgba(255, 255, 255, 0.25);

	border: 1px solid lightgray;

	& .MuiButton-endIcon {
		margin: 0 0 0 0.25rem;
	}
`;

export const SendWrapper = styled(Box)`
	display: flex;
	gap: 0.25rem;
`;

export const SendMessageIcon = styled(SendIcon)`
	fill: lightgray;
`;

export const PreviewWrapper = styled(Box)`
	position: relative;
	box-sizing: border-box;
	width: 4rem;
	height: 3.5rem;
	overflow: hidden;
	border-radius: 4px;
`;
