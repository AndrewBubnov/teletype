import { memo, useMemo } from 'react';
import { useCommonStore } from '@/store';
import {
	CenterHorizontalWrapper,
	ChatHeaderLink,
	ChatHeaderWrapper,
	ElapsedTimeStub,
	ElapsedTimeWrapper,
	StyledBackIcon,
} from '@/app/chat/[chatId]/styled';
import { Typography } from '@mui/material';
import { ElapsedTime } from '@/app/chat/[chatId]/components/ElapsedTime';
import { getInterlocutorState } from '@/app/chat/[chatId]/utils/getInterlocutorState';
import { CHAT_LIST } from '@/constants';
import { ChatHeaderProps, VisitorStatus } from '@/types';
import { UserPhotoImage } from '@/app/shared/styled';

const ChatHeaderComponent = ({ chatId, interlocutorId, interlocutorName, interlocutorImageUrl }: ChatHeaderProps) => {
	const { chatVisitorStatus, activeUsers } = useCommonStore(state => ({
		chatVisitorStatus: state.chatVisitorStatus,
		activeUsers: state.activeUsers,
	}));

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
			<ChatHeaderLink href={CHAT_LIST}>
				<CenterHorizontalWrapper>
					<StyledBackIcon />
					{interlocutorImageUrl && <UserPhotoImage src={interlocutorImageUrl} alt={'photo'} size={30} />}
					<Typography>{interlocutorName}</Typography>
				</CenterHorizontalWrapper>
			</ChatHeaderLink>
			{interlocutorState ? (
				<ElapsedTimeWrapper color={interlocutorState.color}>
					{interlocutorState.status === VisitorStatus.IN ? (
						interlocutorState.text
					) : (
						<ElapsedTime prefix={interlocutorState.text} lastSeen={interlocutorState.data} />
					)}
				</ElapsedTimeWrapper>
			) : (
				<ElapsedTimeStub />
			)}
		</ChatHeaderWrapper>
	);
};

export const ChatHeader = memo(ChatHeaderComponent);
