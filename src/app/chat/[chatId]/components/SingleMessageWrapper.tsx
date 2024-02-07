import { forwardRef, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { ContextMenu } from '@/app/chat/[chatId]/components/ContextMenu';
import { downloadImage } from '@/app/chat/[chatId]/utils/downloadImage';
import { useLongPress } from '@/app/chat/[chatId]/hooks/useLongPress';
import { dateOptions } from '@/app/chat/[chatId]/constants';
import { MessageType, SingleMessageWrapperProps } from '@/types';
import styles from '@/app/chat/[chatId]/chatId.module.css';
import { MessageContext } from '@/app/chat/[chatId]/providers/MessageProvider';

export const SingleMessageWrapper = forwardRef<HTMLDivElement, SingleMessageWrapperProps>(
	({ message, updateIsRead, isAuthoredByUser, children }: SingleMessageWrapperProps, ref) => {
		const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
		const {
			replyMessageHandler,
			editMessageHandler,
			addReactionHandler,
			selectModeStartHandler,
			addSelection,
			isSelectMode,
			firstUnreadId,
		} = useContext(MessageContext);

		const onReplyMessage = replyMessageHandler(message);
		const onEditMessage = editMessageHandler(message);
		const onAddReaction = addReactionHandler(message);
		const onSelectModeStart = selectModeStartHandler(message.id);

		useEffect(() => {
			if (!ref || !('current' in ref) || !ref.current) return;
			if (message.isRead) return;

			const observer = new IntersectionObserver(
				([entry]) => {
					if (entry.isIntersecting) observer.disconnect();
					if (entry.isIntersecting && updateIsRead) updateIsRead(message);
				},
				{ rootMargin: '0px', threshold: 0.5 }
			);
			observer.observe(ref.current);
			return () => observer.disconnect();
		}, [message, ref, updateIsRead]);

		const onPress = useCallback(() => {
			if (isSelectMode) {
				addSelection(message.id);
				return;
			}
			setIsMenuOpen(true);
		}, [addSelection, isSelectMode, message.id]);

		const pressHandler = useLongPress({ onPress, onLongPress: onSelectModeStart });

		const isFirstDateDateMessagePrefix = useMemo(() => {
			if (message.isFirstDateMessage) {
				return (
					<div className={styles.newDateIndicator}>
						{new Intl.DateTimeFormat('en-US', dateOptions).format(new Date(message.createdAt))}
					</div>
				);
			}
			return null;
		}, [message.createdAt, message.isFirstDateMessage]);

		const onDownLoadImage =
			message.imageUrl && message.type === MessageType.COMMON ? () => downloadImage(message) : null;

		const isFirstUnreadPrefix = useMemo(() => {
			if (firstUnreadId === message.id) {
				return <div className={styles.unreadIndicator}>Unread messages</div>;
			}
			return null;
		}, [firstUnreadId, message.id]);
		return (
			<label className={styles.styledLabel} htmlFor={message.id} {...pressHandler}>
				{isFirstDateDateMessagePrefix}
				{isFirstUnreadPrefix}
				<div className={styles.messageWrapper} ref={ref} id={message.id}>
					{isMenuOpen && (
						<ContextMenu
							onClose={() => setIsMenuOpen(false)}
							top={ref && 'current' in ref ? ref.current?.getBoundingClientRect().top : 0}
							onEditMessage={onEditMessage}
							onReplyMessage={onReplyMessage}
							onDownLoadImage={onDownLoadImage}
							onAddReaction={onAddReaction}
							isAuthor={isAuthoredByUser}
						/>
					)}
					{children}
				</div>
			</label>
		);
	}
);

SingleMessageWrapper.displayName = 'SingleMessageWrapper';
