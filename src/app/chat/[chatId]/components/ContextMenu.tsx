import { useRef } from 'react';
import { createPortal } from 'react-dom';
import { clsx } from 'clsx';
import { useAnimate } from '@/app/shared/hooks/useAnimate';
import { useClickOutside } from '@/app/shared/hooks/useClickOutside';
import { CiEdit as EditIcon } from 'react-icons/ci';
import { VscReply as ReplyIcon } from 'react-icons/vsc';
import { BsDownload as DownloadIcon } from 'react-icons/bs';
import { reactions } from '@/app/chat/[chatId]/constants';
import { ContextMenuProps } from '@/types';
import styles from '../chatId.module.css';

export const ContextMenu = ({
	onClose,
	onReplyMessage,
	onEditMessage,
	isAuthor,
	onDownLoadImage,
	onAddReaction,
	top = 0,
}: ContextMenuProps) => {
	const { isActive, closeHandler, onCloseReturn } = useAnimate(onClose);
	const menuRef = useRef<HTMLDivElement>(null);

	useClickOutside([menuRef], closeHandler);

	const editHandler = () => {
		onEditMessage();
		closeHandler();
	};

	const replyHandler = () => {
		onReplyMessage();
		closeHandler();
	};

	const addReactionHandler = (reaction: string) => {
		onAddReaction(reaction);
		closeHandler();
	};

	const downloadHandler = () => {
		if (onDownLoadImage) onDownLoadImage();
		closeHandler();
	};

	return createPortal(
		<div
			ref={menuRef}
			className={clsx(styles.menu, {
				[styles.menuIn]: isActive,
				[styles.menuOut]: !isActive,
			})}
			onTransitionEnd={onCloseReturn}
			style={{ top: `${top}px` }}
		>
			{!isAuthor ? (
				<div className={styles.reactionsWrapper}>
					{reactions.map(reaction => (
						<div key={reaction} onClick={() => addReactionHandler(reaction)}>
							{String.fromCodePoint(parseInt(reaction, 16))}
						</div>
					))}
				</div>
			) : null}
			<ul>
				{isAuthor ? (
					<li>
						<button className={styles.menuListButton} onClick={editHandler}>
							<EditIcon />
							<span className={styles.menuListOptionText}>Edit</span>
						</button>
					</li>
				) : null}
				<li>
					<button className={styles.menuListButton} onClick={replyHandler}>
						<ReplyIcon />
						<span className={styles.menuListOptionText}>Reply</span>
					</button>
				</li>
				{onDownLoadImage ? (
					<li>
						<button className={styles.menuListButton} onClick={downloadHandler}>
							<DownloadIcon />
							<span className={styles.menuListOptionText}>Download</span>
						</button>
					</li>
				) : null}
			</ul>
		</div>,
		document.body
	);
};
