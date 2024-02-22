'use client';

import { DragEvent } from 'react';
import { useActiveChatStore, useIsWideModeStore, useLeftSideWidthStore } from '@/store';
import dynamic from 'next/dynamic';
import { FullScreenLoader } from '@/app/shared/components/FullScreenLoader';
import { DIVIDER_MARGIN, MAX_LEFT_SIDE_WIDTH, MIN_LEFT_SIDE_WIDTH } from '@/constants';
import styles from './WideMode.module.css';

const DynamicChat = dynamic(() => import('@/app/chat-list/[chatId]/components/Chat/Chat').then(res => res.Chat), {
	ssr: false,
	loading: () => <FullScreenLoader />,
});

export const WideMode = () => {
	const activeChat = useActiveChatStore(state => state.activeChat);
	const isWideMode = useIsWideModeStore(state => state.isWideMode);
	const setLeftSideWidth = useLeftSideWidthStore(state => state.setLeftSideWidth);

	if (!activeChat || !isWideMode) return null;

	const mouseMoveHandler = (evt: DragEvent<HTMLDivElement>) => {
		if (!evt.clientX) return;
		const leftSideWidth = ((evt.clientX - DIVIDER_MARGIN) / window.innerWidth) * 100;
		setLeftSideWidth(Math.min(Math.max(leftSideWidth, MIN_LEFT_SIDE_WIDTH), MAX_LEFT_SIDE_WIDTH));
	};

	return (
		<>
			<div className={styles.container}>
				<div draggable className={styles.handle} onDrag={mouseMoveHandler} />
				<div className={styles.divider} />
			</div>
			<DynamicChat chat={activeChat} />
		</>
	);
};
