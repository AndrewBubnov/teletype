'use client';

import { useActiveChatStore, useIsWideModeStore } from '@/store';
import { Chat } from '@/app/chat-list/[chatId]/components/Chat';

export const ChatWrapper = () => {
	const activeChat = useActiveChatStore(state => state.activeChat);
	const isWideMode = useIsWideModeStore(state => state.isWideMode);

	if (!activeChat || !isWideMode) return null;
	return <Chat chat={activeChat} />;
};
