import { useContext, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
	CenterHorizontalWrapper,
	ChatHeaderWrapper,
	ElapsedTimeWrapper,
	StyledBackIcon,
} from '@/app/chat/[chatId]/styled';
import { IconButton, Typography } from '@mui/material';
import { UserPhotoImage } from '@/app/chat/styled';
import { ChatHeaderProps, VisitorStatus } from '@/types';
import { ElapsedTime } from '@/app/chat/[chatId]/components/ElapsedTime';
import { getInterlocutorState } from '@/app/chat/[chatId]/utils/getInterlocutorState';
import { SocketContext } from '@/app/providers/SocketProvider';
import { CHATS_LIST } from '@/constants';

export const ChatHeader = ({ chatId, interlocutorId, interlocutorName, interlocutorImageUrl }: ChatHeaderProps) => {
	const { chatVisitorStatus, activeUsers } = useContext(SocketContext);
	const { push } = useRouter();
	const redirectToChatPage = () => push(CHATS_LIST);

	const interlocutorState = useMemo(
		() =>
			getInterlocutorState({
				chatVisitorStatus,
				chatId,
				interlocutorId,
				activeUsers,
			}),
		[activeUsers, chatVisitorStatus, chatId, interlocutorId]
	);
	return (
		<ChatHeaderWrapper>
			<CenterHorizontalWrapper>
				<IconButton onClick={redirectToChatPage}>
					<StyledBackIcon />
				</IconButton>
				{interlocutorImageUrl && <UserPhotoImage src={interlocutorImageUrl} alt={'photo'} size={30} />}
				<Typography>{interlocutorName}</Typography>
			</CenterHorizontalWrapper>
			{interlocutorState && (
				<ElapsedTimeWrapper color={interlocutorState.color}>
					{interlocutorState.status === VisitorStatus.IN ? (
						interlocutorState.text
					) : (
						<ElapsedTime prefix={interlocutorState.text} lastSeen={interlocutorState.data} />
					)}
				</ElapsedTimeWrapper>
			)}
		</ChatHeaderWrapper>
	);
};
