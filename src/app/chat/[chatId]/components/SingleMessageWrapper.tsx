import styles from '@/app/chat/[chatId]/chatId.module.css';
import { ContextMenu } from '@/app/chat/[chatId]/components/ContextMenu';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { dateOptions } from '@/app/chat/[chatId]/constants';
import { MessageType } from '@/types';
import { downloadImage } from '@/app/chat/[chatId]/utils/downloadImage';
import { useLongPress } from '@/app/chat/[chatId]/hooks/useLongPress';

export const SingleMessageWrapper = ({
	message,
	updateIsRead,
	firstUnreadId,
	addSelection,
	isSelectMode,
	onSelectModeStart,
	children,
}) => {
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

	const containerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (!containerRef.current || message.isRead) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) observer.disconnect();
				if (entry.isIntersecting && updateIsRead) updateIsRead(message);
			},
			{ rootMargin: '0px', threshold: 0.5 }
		);
		observer.observe(containerRef.current);
		return () => observer.disconnect();
	}, [message, updateIsRead]);

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
			<div className={styles.messageWrapper} ref={containerRef} id={message.id}>
				{isMenuOpen && (
					<ContextMenu
						onClose={() => setIsMenuOpen(false)}
						top={containerRef.current?.getBoundingClientRect().top}
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
};
