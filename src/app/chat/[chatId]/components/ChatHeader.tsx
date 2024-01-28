import { memo, useMemo, useState } from 'react';
import { useCommonStore } from '@/store';
import { ElapsedTime } from '@/app/chat/[chatId]/components/ElapsedTime';
import { getInterlocutorState } from '@/app/chat/[chatId]/utils/getInterlocutorState';
import { SelectModeHeader } from '@/app/shared/components/SelectModeHeader';
import styles from '../chatId.module.css';
import { ChatHeaderProps, VisitorStatus } from '@/types';
import { useSubscribe } from '@/app/hooks/useSubscribe';
import { clearIsTyping, updateIsTyping } from '@/webSocketActions/updateIsTyping';
import { clsx } from 'clsx';

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

	const [isTyping, setIsTyping] = useState<boolean>(false);

	useSubscribe(setIsTyping, updateIsTyping, clearIsTyping);

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

	if (isSelectMode) {
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
	}

	if (isTyping)
		return (
			<div className={clsx(styles.elapsedTimeWrapper, styles.typedWrapper)}>
				<p className={styles.typed}>is typing...</p>
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
