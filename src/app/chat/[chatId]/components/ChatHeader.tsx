import { memo, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
	CenterHorizontalWrapper,
	ChatHeaderWrapper,
	ElapsedTimeWrapper,
	StyledBackIcon,
} from '@/app/chat/[chatId]/styled';
import { IconButton, Typography } from '@mui/material';
import { UserPhotoImage } from '@/app/chat/styled';
import { ElapsedTime } from '@/app/chat/[chatId]/components/ElapsedTime';
import { getInterlocutorState } from '@/app/chat/[chatId]/utils/getInterlocutorState';
import { CHAT_LIST } from '@/constants';
import { ChatHeaderProps, VisitorStatus } from '@/types';
import { useStore } from '@/store';

const ChatHeaderComponent = ({ chatId, interlocutorId, interlocutorName, interlocutorImageUrl }: ChatHeaderProps) => {
	const { chatVisitorStatus, activeUsers } = useStore(state => ({
		chatVisitorStatus: state.chatVisitorStatus,
		activeUsers: state.activeUsers,
	}));
	const { push } = useRouter();
	const redirectToChatPage = () => push(CHAT_LIST);

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

export const ChatHeader = memo(ChatHeaderComponent);
