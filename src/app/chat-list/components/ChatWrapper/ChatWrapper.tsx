'use client';

import { useActiveChatStore, useIsWideModeStore } from '@/store';
import dynamic from 'next/dynamic';
import { FullScreenLoader } from '@/app/shared/components/FullScreenLoader';
import styles from './ChatWrapper.module.css';

const DynamicChat = dynamic(() => import('@/app/chat-list/[chatId]/components/Chat/Chat').then(res => res.Chat), {
	ssr: false,
	loading: () => <FullScreenLoader />,
});

export const ChatWrapper = () => {
	const activeChat = useActiveChatStore(state => state.activeChat);
	const isWideMode = useIsWideModeStore(state => state.isWideMode);

	if (!activeChat || !isWideMode) return null;

	return (
		<>
			<div className={styles.divider} />
			<DynamicChat chat={activeChat} />
		</>
	);
};
