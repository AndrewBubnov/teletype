import { Box } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import {
	DropReplyMessageButton,
	RepliedMessageAuthor,
	RepliedMessageAuthorInner,
	RepliedMessageContainer,
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
					<Box>{new Intl.DateTimeFormat('en-US', options).format(new Date(message.date))}</Box>
				</RepliedTimeContainer>
			</RepliedMessageAuthor>
			<RepliedMessageText>
				<RepliedMessageInner>
					{message.type === MessageType.TEXT ? (
						message.text
					) : (
						<Image src={message.imageUrl!} width={20} height={20} alt="" />
					)}
				</RepliedMessageInner>
			</RepliedMessageText>
		</RepliedMessageContainer>
	) : null;
