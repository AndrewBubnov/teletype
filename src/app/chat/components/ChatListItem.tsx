import { useMemo } from 'react';
import { useCommonStore, useMessagesSliceStore } from '@/store';
import { useLongPress } from '@/app/chat/[chatId]/hooks/useLongPress';
import { clsx } from 'clsx';
import Image from 'next/image';
import styles from '@/app/chat/chat.module.css';
import { timeOptions } from '@/app/chat/[chatId]/constants';
import { ChatListItemProps } from '@/types';
import { StyledCheckbox } from '@/app/shared/components/StyledCheckbox';

export const ChatListItem = ({
	chatId,
	interlocutor,
	onPress,
	onLongPress,
	isSelectMode,
	isChecked,
}: ChatListItemProps) => {
	const activeUsers = useCommonStore(state => state.activeUsers);

	const { messagesSlice, userId } = useMessagesSliceStore(state => ({
		messagesSlice: state.messagesSlice,
		userId: state.userId,
	}));

	const lastMessage = messagesSlice[chatId]?.lastMessage || null;
	const unreadNumber = lastMessage?.authorId !== userId ? messagesSlice[chatId]?.unreadNumber || 0 : 0;

	const pressHandler = useLongPress({ onLongPress, onPress });

	const isActive = useMemo(
		() => activeUsers.includes(interlocutor?.userId || ''),
		[activeUsers, interlocutor?.userId]
	);

	return (
		<label className={styles.styledLabel} htmlFor={chatId} {...pressHandler}>
			<div className={styles.chatListItemInnerWrapper}>
				<div className={styles.userWrapper}>
					<div className={styles.userNameWrapper}>
						{interlocutor?.imageUrl ? (
							<div className={styles.activeWrapper}>
								<Image
									src={interlocutor?.imageUrl}
									height={50}
									width={50}
									alt="photo"
									priority
									className={styles.userPhotoImage}
								/>
								{isActive ? <div className={styles.activeUser} /> : null}
							</div>
						) : (
							<div className={clsx(styles.userPhotoImage, styles.size50)}>
								{interlocutor?.email.at(0)?.toUpperCase()}
							</div>
						)}
						<div className={styles.chatListItemUsername}>
							{interlocutor?.username || interlocutor?.email}
						</div>
					</div>
					{lastMessage && !isSelectMode ? (
						<div className={styles.chatListItemDateWrapper}>
							{new Intl.DateTimeFormat('en-US', timeOptions).format(new Date(lastMessage.createdAt))}
						</div>
					) : null}
				</div>
				{lastMessage ? (
					<div className={styles.userWrapper}>
						<div className={styles.lastMessageWrapper}>
							{lastMessage.imageUrl ? (
								<Image
									src={lastMessage.imageUrl}
									width={25}
									height={25}
									className={styles.microPreviewImage}
									alt="preview"
								/>
							) : null}
							<div className={styles.chatListItemMessageText}>{lastMessage.text}</div>
						</div>
						{unreadNumber && !isSelectMode ? (
							<div className={styles.chatUnreadMessages}>{unreadNumber}</div>
						) : null}
					</div>
				) : null}
			</div>
			{isSelectMode ? (
				<div className={styles.cell}>
					<StyledCheckbox id={chatId} checked={isChecked} />
				</div>
			) : null}
		</label>
	);
};
