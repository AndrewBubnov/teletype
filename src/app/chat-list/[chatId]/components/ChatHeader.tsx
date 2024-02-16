import { memo, useMemo, useState } from 'react';
import { useSubscribe } from '@/app/hooks/useSubscribe';
import { useStatusStore } from '@/store';
import { clsx } from 'clsx';
import { ElapsedTime } from '@/app/chat-list/[chatId]/components/ElapsedTime';
import { getInterlocutorState } from '@/app/chat-list/[chatId]/utils/getInterlocutorState';
import { SelectModeHeader } from '@/app/shared/components/SelectModeHeader';
import { clearIsTyping, updateIsTyping } from '@/webSocketActions/updateIsTyping';
import { ChatHeaderProps, VisitorStatus } from '@/types';
import styles from '../chatId.module.css';

const ChatHeaderComponent = ({
	chatId,
	interlocutorId,
	isSelectMode,
	dropSelectMode,
	selectedNumber,
	isAllSelected,
	toggleAllSelected,
	onDelete,
}: ChatHeaderProps) => {
	const { chatVisitorStatus, activeUsers } = useStatusStore(state => ({
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
			<SelectModeHeader
				dropSelectMode={dropSelectMode}
				selectedNumber={selectedNumber}
				onDelete={onDelete}
				isAllSelected={isAllSelected}
				toggleAllSelected={toggleAllSelected}
			/>
		);
	}

	if (isTyping) {
		return (
			<div className={clsx(styles.elapsedTimeWrapper, styles.typedWrapper)}>
				<p className={styles.typed}>is typing...</p>
			</div>
		);
	}

	return interlocutorState && !isSelectMode ? (
		<p className={styles.elapsedTimeWrapper} style={{ color: interlocutorState.color }}>
			{interlocutorState.status === VisitorStatus.IN ? (
				interlocutorState.text
			) : (
				<ElapsedTime prefix={interlocutorState.text} lastSeen={interlocutorState.data} />
			)}
		</p>
	) : (
		<div className={styles.elapsedTimeStub} />
	);
};

export const ChatHeader = memo(ChatHeaderComponent);
