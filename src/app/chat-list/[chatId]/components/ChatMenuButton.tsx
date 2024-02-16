import { useRef, useState } from 'react';
import { PiDotsThreeOutlineVerticalFill as MenuIcon } from 'react-icons/pi';
import { ChatMenu } from '@/app/chat-list/[chatId]/components/ChatMenu';
import { ChatMenuButtonProps } from '@/types';
import styles from '../chatId.module.css';

export const ChatMenuButton = ({ onDeleteChat, onClearChatHistory }: ChatMenuButtonProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

	const portalContainerRef = useRef<HTMLDivElement>(null);
	return (
		<>
			{isMenuOpen && <div className={styles.menuBackdrop} />}
			<div ref={portalContainerRef}>
				<button className={styles.chatMenuIconButton} onClick={() => setIsMenuOpen(prevState => !prevState)}>
					<MenuIcon />
				</button>
				{isMenuOpen && portalContainerRef.current && (
					<ChatMenu
						onClose={() => setIsMenuOpen(false)}
						onClearChatHistory={onClearChatHistory}
						onDeleteChat={onDeleteChat}
						ref={portalContainerRef}
					/>
				)}
			</div>
		</>
	);
};
