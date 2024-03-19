import { CSSProperties, useLayoutEffect, useRef, useState } from 'react';
import { useAnimate } from '@/app/shared/hooks/useAnimate';
import { useClickOutside } from '@/app/shared/hooks/useClickOutside';
import { clsx } from 'clsx';
import { CiEdit as EditIcon } from 'react-icons/ci';
import { VscReply as ReplyIcon } from 'react-icons/vsc';
import { BsDownload as DownloadIcon } from 'react-icons/bs';
import { reactions } from '@/app/chat-list/[chatId]/constants';
import { ContextMenuProps } from '@/types';
import styles from './ContextMenu.module.css';

export const ContextMenu = ({
	onAddReaction,
	onCloseMenu,
	onReplyMessage,
	onEditMessage,
	onDownLoadImage,
	isAuthor,
	messageParams,
	containerRef,
}: ContextMenuProps) => {
	const { isActive, closeHandler, onCloseReturn } = useAnimate(onCloseMenu);
	const [menuTop, setMenuTop] = useState(0);

	const ref = useRef<HTMLDivElement>(null);

	useClickOutside([ref], closeHandler);

	useLayoutEffect(() => {
		if (!ref.current || !messageParams) return;
		const initMenuParams = ref.current.getBoundingClientRect();
		const wrapperTop = containerRef.current?.getBoundingClientRect().top || 0;
		const messageTop = messageParams.current?.top || 0;
		const messageHeight = messageParams.current?.height || 0;
		const menuHeight = initMenuParams.height || 0;
		setMenuTop(messageTop - wrapperTop - (menuHeight - messageHeight) / 2);
	}, [containerRef, messageParams]);

	return (
		<div className={styles.menuBackdrop}>
			<div
				onTransitionEnd={onCloseReturn}
				className={clsx(styles.menuCard, {
					[styles.menuCardIsActive]: isActive,
					[styles.menuCardIsInActive]: !isActive,
				})}
				ref={ref}
				style={{ '--y-offset': `${menuTop}px` } as CSSProperties}
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
				<ul className={styles.ul}>
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
