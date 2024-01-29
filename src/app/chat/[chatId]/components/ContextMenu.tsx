import { CSSProperties, useLayoutEffect, useRef } from 'react';
import { clsx } from 'clsx';
import { useClickOutside } from '@/app/shared/hooks/useClickOutside';
import { AiOutlineDelete as DeleteIcon } from 'react-icons/ai';
import { CiEdit as EditIcon } from 'react-icons/ci';
import { VscReply as ReplyIcon } from 'react-icons/vsc';
import { BsDownload as DownloadIcon } from 'react-icons/bs';
import { useAnimate } from '@/app/shared/hooks/useAnimate';
import { reactions } from '@/app/chat/[chatId]/constants';
import { ContextMenuProps } from '@/types';
import styles from '../chatId.module.css';

export const ContextMenu = ({
	onAddReaction,
	onCloseMenu,
	initMenuParams,
	menuTop,
	onReplyMessage,
	onEditMessage,
	onDeleteMessage,
	onDownLoadImage,
	isAuthor,
}: ContextMenuProps) => {
	const { isActive, closeHandler, onCloseReturn } = useAnimate(onCloseMenu);
	const ref = useRef<HTMLDivElement>(null);

	useClickOutside([ref], closeHandler);

	useLayoutEffect(() => {
		if (!ref.current) return;
		initMenuParams.current = ref.current.getBoundingClientRect();
	}, [initMenuParams]);

	return (
		<div className={styles.menuBackdrop}>
			<div
				onTransitionEnd={onCloseReturn}
				className={clsx(styles.menuCard, {
					[styles.menuCardIsActive]: isActive,
					[styles.menuCardIsInActive]: !isActive,
				})}
				ref={ref}
				style={{ '--yOffset': `${menuTop}px` } as CSSProperties}
			>
				{!isAuthor ? (
					<div className={styles.reactionsWrapper}>
						{reactions.map(reaction => (
							<div key={reaction} onClick={() => onAddReaction(reaction)}>
								{String.fromCodePoint(parseInt(reaction, 16))}
							</div>
						))}
					</div>
				) : null}
				<ul>
					<li>
						<button className={styles.menuListButton} onClick={onDeleteMessage}>
							<DeleteIcon />
							<span className={styles.menuListOptionText}>Delete</span>
						</button>
					</li>
					{isAuthor ? (
						<li>
							<button className={styles.menuListButton} onClick={onEditMessage}>
								<EditIcon />
								<span className={styles.menuListOptionText}>Edit</span>
							</button>
						</li>
					) : null}
					<li>
						<button className={styles.menuListButton} onClick={onReplyMessage}>
							<ReplyIcon />
							<span className={styles.menuListOptionText}>Reply</span>
						</button>
					</li>
					{onDownLoadImage ? (
						<li>
							<button className={styles.menuListButton} onClick={onDownLoadImage}>
								<DownloadIcon />
								<span className={styles.menuListOptionText}>Download</span>
							</button>
						</li>
					) : null}
				</ul>
			</div>
		</div>
	);
};
