import { CSSProperties, useLayoutEffect, useRef } from 'react';
import { clsx } from 'clsx';
import { AiOutlineDelete as DeleteIcon } from 'react-icons/ai';
import { MdOutlineDone as CheckIcon } from 'react-icons/md';
import { CiEdit as EditIcon } from 'react-icons/ci';
import { VscReply as ReplyIcon } from 'react-icons/vsc';
import { BsDownload as DownloadIcon } from 'react-icons/bs';
import styles from '../chatId.module.css';
import { reactions } from '@/app/chat/[chatId]/constants';
import { ContextMenuProps } from '@/types';
import { useMenuAnimate } from '@/app/chat/[chatId]/hooks/useMenuAnimate';

export const ContextMenu = ({
	onAddReaction,
	onCloseMenu,
	initMenuParams,
	menuTop,
	onReplyMessage,
	onEditMessage,
	onDeleteMessage,
	onSelect,
	onDownLoadImage,
	isAuthor,
}: ContextMenuProps) => {
	const { isActive, animationStartHandler, closeHandler } = useMenuAnimate(onCloseMenu);
	const ref = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		if (!ref.current) return;
		initMenuParams.current = ref.current.getBoundingClientRect();
	}, [initMenuParams]);

	return (
		<div className={styles.menuBackdrop} onClick={animationStartHandler}>
			<div
				onTransitionEnd={closeHandler}
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
					<li>
						<button className={styles.menuListButton} onClick={onSelect}>
							<CheckIcon />
							<span className={styles.menuListOptionText}>Select</span>
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
