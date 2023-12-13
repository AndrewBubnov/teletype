'use client';
import { styled } from '@mui/material/styles';
import emotionStyled from '@emotion/styled';
import Image, { ImageProps } from 'next/image';
import { Box, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { ElapsedTimeWrapperProps, MessageBoxProps, MessageItemBottomProps } from '@/types';

export const ChatWrapper = styled(Box)`
	padding: 1rem;
	overflow-y: auto;
	overflow-x: hidden;
	height: 80vh;
`;

export const CoverWrapper = styled(Box)`
	position: relative;
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
export const MessageItem = styled(({ isAuthoredByUser, transparent, ...props }: MessageBoxProps) => <Box {...props} />)`
	position: relative;
	padding: 0.5rem;
	background: ${({ isAuthoredByUser, transparent }) => {
		if (transparent) return 'transparent';
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
	z-index: 10;
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

export const SendMessageFormWrapper = styled(Box)`
	display: flex;
	justify-content: center;
	width: 100%;
	padding: 0 1rem;
	position: fixed;
	bottom: 1rem;
`;

export const MenuCard = styled(Box)`
	padding: 0.5rem;
	width: 50%;
	height: fit-content;
	background: lightgoldenrodyellow;
	border-radius: 0.25rem;
`;
export const EmojiWrapper = styled(Box)`
	position: absolute;
	bottom: 60px;
	right: 0.5rem;
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

export const ChatsListHeader = styled(Box)`
	display: flex;
	flex-direction: row-reverse;
	margin-top: 1rem;
	height: 1.5rem;
`;
export const ChatsListDeleteButton = styled(IconButton)`
	padding: 9px;
`;
export const DeleteIcon = styled(DeleteOutlineIcon)`
	fill: #fff;
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
    display: flex;
    alignItems: stretch;
    width: 100%;
`;
