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
import { RepliedMessageBoxProps } from '@/types';

export const RepliedMessageBox = ({ message, onDropMessage, nameMap }: RepliedMessageBoxProps) =>
	message ? (
		<RepliedMessageContainer>
			<RepliedMessageAuthor>
				<RepliedMessageAuthorInner>
					<DropReplyMessageButton>
						<ClearIcon onMouseDown={onDropMessage} onTouchStart={onDropMessage} />
					</DropReplyMessageButton>
					<RepliedMessageInner>{nameMap[message.authorId]}</RepliedMessageInner>
				</RepliedMessageAuthorInner>
				<RepliedTimeContainer>
					<Box>{new Intl.DateTimeFormat('en-US', options).format(new Date(message.date))}</Box>
				</RepliedTimeContainer>
			</RepliedMessageAuthor>
			<RepliedMessageText>
				<RepliedMessageInner>{message.text}</RepliedMessageInner>
			</RepliedMessageText>
		</RepliedMessageContainer>
	) : null;
