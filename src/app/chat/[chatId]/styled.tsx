'use client';
import { styled } from '@mui/material/styles';
import emotionStyled from '@emotion/styled';
import Image, { ImageProps } from 'next/image';
import { Box, Button, Checkbox, DialogContentText, IconButton, FormLabel } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ReplyIcon from '@mui/icons-material/ReplyOutlined';
import DownIcon from '@mui/icons-material/KeyboardArrowDown';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { ElapsedTimeWrapperProps, MessageBoxProps, MessageItemBottomProps, StyledButtonProps } from '@/types';

export const ChatWrapper = styled(Box)`
	padding: 1rem;
	overflow-y: auto;
	overflow-x: hidden;
	height: 80vh;

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

	@media (max-width: 600px) {
		height: 75vh;
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

export const UnreadNumberIcon = styled(DownIcon)`
	fill: darkgreen;
	margin-top: 3px;
`;

export const UploadFileIcon = styled(AttachFileIcon)`
	margin-right: 1rem;
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
export const ReplyToContainer = styled(Box)`
	background: palegreen;
	border-radius: 0.25rem;
	padding: 0.25rem;
	margin-bottom: 0.5rem;
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
export const RepliedMessageText = styled(Box)`
	flex: 1;
	display: flex;
	align-items: center;
	background: lightgray;
	border-bottom-left-radius: 4px;
	border-bottom-right-radius: 4px;
	padding: 0 0.5rem;
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
const MessageWrapper = styled(Box)(() => ({
	display: 'flex',
	padding: '1rem 0',
}));
export const AuthorMessageWrapper = styled(MessageWrapper)`
	flex-direction: row-reverse;
`;
export const InterlocutorMessageWrapper = styled(MessageWrapper)`
	flex-direction: row;
`;
export const MessageItem = styled(({ isAuthoredByUser, isImage = false, ...props }: MessageBoxProps) => (
	<Box {...props} />
))`
	padding: ${({ isImage }) => (isImage ? 0 : '0.5rem')};

	background: ${({ isAuthoredByUser, isImage }) => {
		if (isImage) return 'transparent';
		return isAuthoredByUser ? 'rgba(70,130,180,0.6)' : 'rgba(112,128,144,0.5)';
	}};
	border-radius: 4px;
`;

export const MessageItemBottom = styled(({ multipleChild, ...props }: MessageItemBottomProps) => <Box {...props} />)`
	display: flex;
	flex-direction: ${({ multipleChild }) => (multipleChild ? 'row' : 'row-reverse')};
	align-items: flex-end;
	gap: 1rem;
	margin-top: 0.5rem;
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
`;

export const StyledImage = styled(Image)`
	border-radius: 0.25rem;
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
export const EmojiWrapper = styled(Box)`
	position: absolute;
	bottom: 60px;
	right: 0.5rem;
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

export const SendMessageForm = emotionStyled.form`
    width: 100%;
`;
