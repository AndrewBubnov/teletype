'use client';
import { useEffect, useMemo, useState } from 'react';
import { useActiveChatStore, useCommonStore, useIsWideModeStore, useLastMessageStore } from '@/store';
import { useRouter } from 'next/navigation';
import { sendDeleteUserChats } from '@/webSocketActions/sendDeleteUserChats';
import { deleteChats } from '@/prismaActions/deleteChats';
import { useSelect } from '@/app/shared/hooks/useSelect';
import { ChatListItem } from '@/app/chat-list/components/ChatListItem/ChatListItem';
import { Fade } from '@/app/shared/components/Fade';
import { LeftSideResizable } from '@/app/chat-list/components/LeftSideResizable/LeftSideResizable';
import { SelectModeHeader } from '@/app/shared/components/SelectModeHeader';
import { sortChatsByLatestMessage } from '@/app/chat-list/utils/sortChatsByLatestMessage';
import { CHAT_LIST } from '@/constants';
import styles from './ChatsList.module.css';

export const ChatsList = () => {
	const { chatList, userId } = useCommonStore(state => ({
		chatList: state.chatList,
		userId: state.userId,
	}));

	const { activeChat, setActiveChat } = useActiveChatStore(state => ({
		activeChat: state.activeChat,
		setActiveChat: state.setActiveChat,
	}));

	const messageMap = useLastMessageStore(state => state.messageMap);
	const isWideMode = useIsWideModeStore(state => state.isWideMode);

	const [activeChatId, setActiveChatId] = useState<string>('');

	const { selectedIds, isAllSelected, toggleAllSelected, addSelection, startSelection, dropSelectMode } =
		useSelect(chatList);

	const { push } = useRouter();

	const sortedChatList = useMemo(() => sortChatsByLatestMessage(chatList, messageMap), [chatList, messageMap]);

	useEffect(() => {
		if (!activeChat && isWideMode) setActiveChatId(sortedChatList[0]?.chatId);
	}, [activeChat, isWideMode, sortedChatList]);

	useEffect(() => {
		setActiveChat(activeChatId);
	}, [activeChatId, setActiveChat]);

	const chatPressHandler = (id: string, chatId: string) => () => {
		if (selectedIds.length) {
			addSelection(id);
			return;
		}
		if (!isWideMode) push(`${CHAT_LIST}/${chatId}?t=${Date.now()}`, { shallow: true });
		if (isWideMode) setActiveChatId(chatId);
	};

	const chatLongPressHandler = (id: string) => () => startSelection(id);

	const deleteChatsHandler = async () => {
		sendDeleteUserChats(selectedIds);
		dropSelectMode();
		const chatIds = chatList.filter(({ id }) => selectedIds.includes(id)).map(({ chatId }) => chatId);
		await deleteChats(selectedIds, chatIds);
	};

	const isSelectMode = !!selectedIds.length;

	return (
		<LeftSideResizable>
			<div className={styles.chatListSelectModeStub}>
				<Fade isShown={isSelectMode} className={styles.selectModeHeaderWrapper}>
					<SelectModeHeader
						dropSelectMode={dropSelectMode}
						selectedNumber={selectedIds.length}
						onDelete={deleteChatsHandler}
						isAllSelected={isAllSelected}
						toggleAllSelected={toggleAllSelected}
						withPadding
					/>
				</Fade>
			</div>
			{sortedChatList.map(({ chatId, id, members }) => {
				const [interlocutor] = members.filter(member => member.userId !== userId);
				return (
					<ChatListItem
						key={chatId}
						chatId={chatId}
						isActiveChat={activeChat?.chatId === chatId}
						interlocutor={interlocutor}
						onPress={chatPressHandler(id, chatId)}
						onLongPress={chatLongPressHandler(id)}
						isSelectMode={isSelectMode}
						isChecked={selectedIds.includes(id)}
					/>
				);
			})}
		</LeftSideResizable>
	);
};
