import { ForwardedRef, forwardRef, useRef } from 'react';
import { createPortal } from 'react-dom';
import { clsx } from 'clsx';
import { useAnimate } from '@/app/shared/hooks/useAnimate';
import { useClickOutside } from '@/app/shared/hooks/useClickOutside';
import { IoCloseOutline as ClearIcon } from 'react-icons/io5';
import { AiOutlineDelete as DeleteIcon } from 'react-icons/ai';
import { ChatMenuProps } from '@/types';
import styles from './ChatMenu.module.css';

export const ChatMenu = forwardRef<HTMLDivElement, ChatMenuProps>(
	({ onClose, onClearChatHistory, onDeleteChat }: ChatMenuProps, ref: ForwardedRef<HTMLDivElement>) => {
		const { isActive, closeHandler, onCloseReturn } = useAnimate(onClose);
		const menuRef = useRef<HTMLDivElement>(null);

		useClickOutside([menuRef], closeHandler);

		if (!ref || !('current' in ref)) return null;
		if (!ref.current) return null;

		const clearHandler = () => {
			onClearChatHistory();
			closeHandler();
		};

		const deleteHandler = () => {
			onDeleteChat();
			closeHandler();
		};

		return createPortal(
			<div
				ref={menuRef}
				className={clsx(styles.chatMenu, {
					[styles.chatMenuIn]: isActive,
					[styles.chatMenuOut]: !isActive,
				})}
				onTransitionEnd={onCloseReturn}
			>
				<ul>
					<li>
						<button className={styles.menuListButton} onClick={clearHandler}>
							<ClearIcon />
							<span className={styles.menuListOptionText}>Clear history</span>
						</button>
					</li>
					<li>
						<button className={styles.menuListButton} onClick={deleteHandler}>
							<DeleteIcon />
							<span className={styles.menuListOptionText}>Delete chat</span>
						</button>
					</li>
				</ul>
			</div>,
			ref.current
		);
	}
);

ChatMenu.displayName = 'ChatMenu';
