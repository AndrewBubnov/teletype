'use client';

import { useActiveChatStore, useIsWideModeStore } from '@/store';
import { Chat } from '@/app/chat-list/[chatId]/components/Chat';
import styles from '../chat.module.css';

export const ChatWrapper = () => {
	const activeChat = useActiveChatStore(state => state.activeChat);
	const isWideMode = useIsWideModeStore(state => state.isWideMode);

	if (!activeChat || !isWideMode) return null;

	return (
		<>
			<div className={styles.divider} />
			<Chat chat={activeChat} />
		</>
	);
};
