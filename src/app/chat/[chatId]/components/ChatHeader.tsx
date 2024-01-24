import { memo, useMemo } from 'react';
import { useCommonStore } from '@/store';
import Link from 'next/link';
import { IoIosArrowRoundBack as BackIcon } from 'react-icons/io';
import { ElapsedTime } from '@/app/chat/[chatId]/components/ElapsedTime';
import { getInterlocutorState } from '@/app/chat/[chatId]/utils/getInterlocutorState';
import { UserPhotoImage } from '@/app/shared/styled';
import styles from '../chatId.module.css';
import { CHAT_LIST } from '@/constants';
import { ChatHeaderProps, VisitorStatus } from '@/types';

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
		<div>
			<Link href={CHAT_LIST} className={styles.chatHeaderLink}>
				<div className={styles.centerHorizontalWrapper}>
					<BackIcon className={styles.backIcon} />
					{interlocutorImageUrl && <UserPhotoImage src={interlocutorImageUrl} alt={'photo'} size={30} />}
					<p>{interlocutorName}</p>
				</div>
			</Link>
			{interlocutorState ? (
				<p className={styles.elapsedTimeWrapper} style={{ color: interlocutorState.color }}>
					{interlocutorState.status === VisitorStatus.IN ? (
						interlocutorState.text
					) : (
						<ElapsedTime prefix={interlocutorState.text} lastSeen={interlocutorState.data} />
					)}
				</p>
			) : (
				<div className={styles.elapsedTimeStub} />
			)}
		</div>
	);
};

export const ChatHeader = memo(ChatHeaderComponent);
