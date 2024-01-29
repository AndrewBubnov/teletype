import { memo, useContext, useMemo, useState } from 'react';
import { useSubscribe } from '@/app/hooks/useSubscribe';
import { useCommonStore } from '@/store';
import { clsx } from 'clsx';
import { ElapsedTime } from '@/app/chat/[chatId]/components/ElapsedTime';
import { getInterlocutorState } from '@/app/chat/[chatId]/utils/getInterlocutorState';
import { SelectModeHeader } from '@/app/shared/components/SelectModeHeader';
import { clearIsTyping, updateIsTyping } from '@/webSocketActions/updateIsTyping';
import { ChatMenuButton } from '@/app/chat/[chatId]/components/ChatMenuButton';
import { ChatMenuContext } from '@/app/chat/[chatId]/providers/ChatMenuProvider';
import { VisitorStatus } from '@/types';
import styles from '../chatId.module.css';

const ChatHeaderComponent = () => {
	const { chatVisitorStatus, activeUsers } = useCommonStore(state => ({
		chatVisitorStatus: state.chatVisitorStatus,
		activeUsers: state.activeUsers,
	}));

	const {
		chatId,
		interlocutorId,
		isSelectMode,
		dropSelectMode,
		selectedNumber,
		onDelete,
		isAllSelected,
		toggleAllSelected,
	} = useContext(ChatMenuContext);

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

	if (isTyping) {
		return (
			<div className={clsx(styles.elapsedTimeWrapper, styles.typedWrapper)}>
				<p className={styles.typed}>is typing...</p>
			</div>
		);
	}

	return (
		<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
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
			<ChatMenuButton />
		</div>
	);
};

export const ChatHeader = memo(ChatHeaderComponent);
