import { Box } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import {
	DropReplyMessageButton,
	RepliedMessageAuthor,
	RepliedMessageAuthorInner,
	RepliedMessageContainer,
	RepliedMessageImage,
	RepliedMessageInner,
	RepliedMessageText,
	RepliedTimeContainer,
} from '@/app/chat/[chatId]/styled';
import { options } from '@/app/chat/[chatId]/constants';
import { MessageType, RepliedMessageBoxProps } from '@/types';
import Image from 'next/image';

export const RepliedMessageBox = ({ message, onDropMessage, authorName }: RepliedMessageBoxProps) =>
	message ? (
		<RepliedMessageContainer>
			<RepliedMessageAuthor>
				<RepliedMessageAuthorInner>
					<DropReplyMessageButton>
						<ClearIcon onMouseDown={onDropMessage} onTouchStart={onDropMessage} />
					</DropReplyMessageButton>
					<RepliedMessageInner>{authorName}</RepliedMessageInner>
				</RepliedMessageAuthorInner>
				<RepliedTimeContainer>
					<Box>{new Intl.DateTimeFormat('en-US', options).format(new Date(message.createdAt))}</Box>
				</RepliedTimeContainer>
			</RepliedMessageAuthor>
			<RepliedMessageText isMultiple={!!message.text && !!message.imageUrl}>
				<RepliedMessageInner>{message.text && message.text}</RepliedMessageInner>
				{message.imageUrl && (
					<RepliedMessageImage>
						<Image src={message.imageUrl!} width={20} height={20} alt="" />
					</RepliedMessageImage>
				)}
			</RepliedMessageText>
		</RepliedMessageContainer>
	) : null;
