'use client';

import { useActiveChatStore, useIsWideModeStore } from '@/store';
import { Chat } from '@/app/chat-list/[chatId]/components/Chat';

export const ChatWrapper = () => {
	const activeChat = useActiveChatStore(state => state.activeChat);
	const isWideMode = useIsWideModeStore(state => state.isWideMode);

	if (!activeChat || !isWideMode) return null;
	return (
		<>
			<div style={{ width: 1, background: 'rgb(70, 69, 69)', marginBlock: '1rem' }} />
			<Chat chat={activeChat} />
		</>
	);
};
