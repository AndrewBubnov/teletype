import { memo, useMemo } from 'react';
import { useCommonStore } from '@/store';
import { ElapsedTime } from '@/app/chat/[chatId]/components/ElapsedTime';
import { getInterlocutorState } from '@/app/chat/[chatId]/utils/getInterlocutorState';
import { SelectModeHeader } from '@/app/shared/components/SelectModeHeader';
import styles from '../chatId.module.css';
import { ChatHeaderProps, VisitorStatus } from '@/types';

const ChatHeaderComponent = ({
	chatId,
	interlocutorId,
	isSelectMode,
	dropSelectMode,
	selectedNumber,
	onDelete,
	isAllSelected,
	toggleAllSelected,
}: ChatHeaderProps) => {
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

	if (isSelectMode)
		return (
			<div className={styles.selectModeWrapper}>
				<SelectModeHeader
					dropSelectMode={dropSelectMode}
					selectedNumber={selectedNumber}
					onDelete={onDelete}
					isAllSelected={isAllSelected}
					toggleAllSelected={toggleAllSelected}
				/>
			</div>
		);

	return (
		<div>
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
