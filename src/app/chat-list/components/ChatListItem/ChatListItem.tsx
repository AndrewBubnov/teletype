import { useMemo } from 'react';
import { useCommonStore, useIsWideModeStore, useMessageStore, useStatusStore } from '@/store';
import { useLongPress } from '@/app/chat-list/[chatId]/hooks/useLongPress';
import { clsx } from 'clsx';
import Image from 'next/image';
import { StyledCheckbox } from '@/app/shared/components/StyledCheckbox';
import { timeOptions } from '@/app/chat-list/[chatId]/constants';
import { ChatListItemProps } from '@/types';
import styles from './ChatListItem.module.css';

export const ChatListItem = ({
	chatId,
	interlocutor,
	onPress,
	onLongPress,
	isSelectMode,
	isChecked,
	isActiveChat,
}: ChatListItemProps) => {
	const userId = useCommonStore(state => state.userId);
	const activeUsers = useStatusStore(state => state.activeUsers);
	const messageMap = useMessageStore(state => state.messageMap);
	const isWideMode = useIsWideModeStore(state => state.isWideMode);

	const messageList = messageMap[chatId] || [];
	const unreadNumber = messageList.filter(el => !el.isRead && el.authorId !== userId).length;
	const lastMessage = messageList.at(-1) || null;

	const pressHandler = useLongPress({ onLongPress, onPress });

	const isActive = useMemo(
		() => activeUsers.includes(interlocutor?.userId || ''),
		[activeUsers, interlocutor?.userId]
	);

	return (
		<div className={styles.chatListItemWrapper}>
			<label className={styles.styledLabel} htmlFor={chatId} {...pressHandler}>
				<div
					className={clsx(styles.chatListItemInnerWrapper, {
						[styles.notInSelectMode]: !isSelectMode,
						[styles.inSelectMode]: isSelectMode,
						[styles.isActiveChat]: isActiveChat,
					})}
				>
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
							<div
								className={clsx(styles.lastMessageWrapper, {
									[styles.lastMessageWrapperInWideMode]: isWideMode,
									[styles.lastMessageWrapperInNarrowMode]: !isWideMode,
								})}
							>
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
		</div>
	);
};
