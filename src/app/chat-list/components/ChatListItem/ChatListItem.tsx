import { useMemo } from 'react';
import { useDraftMessageStore, useIsWideModeStore, useLastMessageStore, useStatusStore } from '@/store';
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
	const activeUsers = useStatusStore(state => state.activeUsers);
	const messageMap = useLastMessageStore(state => state.messageMap);
	const isWideMode = useIsWideModeStore(state => state.isWideMode);
	const draftMap = useDraftMessageStore(state => state.draftMap);

	const chatUnreadParams = messageMap[chatId] || [];
	const unreadNumber = chatUnreadParams.unreadNumber || 0;
	const lastMessage = chatUnreadParams.lastMessage || null;
	const draft = draftMap[chatId] || null;

	const pressHandler = useLongPress({ onLongPress, onPress });

	const isActive = useMemo(
		() => activeUsers.includes(interlocutor?.userId || ''),
		[activeUsers, interlocutor?.userId]
	);

	const renderedMessage = useMemo(() => {
		if (!unreadNumber && draft) {
			return (
				<div className={styles.chatListItemMessageText}>
					<span className={styles.draft}>Draft: </span>
					{draft}
				</div>
			);
		}
		return lastMessage ? (
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
				{unreadNumber && !isSelectMode ? <div className={styles.chatUnreadMessages}>{unreadNumber}</div> : null}
			</div>
		) : null;
	}, [draft, isSelectMode, isWideMode, lastMessage, unreadNumber]);

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
					{renderedMessage}
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
