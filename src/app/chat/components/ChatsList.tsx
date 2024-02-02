'use client';
import { useCommonStore, useMessagesSliceStore } from '@/store';
import { useRouter } from 'next/navigation';
import { sendDeleteUserChats } from '@/webSocketActions/sendDeleteUserChats';
import { deleteChats } from '@/prismaActions/deleteChats';
import { useSelect } from '@/app/shared/hooks/useSelect';
import { ChatListItem } from '@/app/chat/components/ChatListItem';
import { SelectModeHeader } from '@/app/shared/components/SelectModeHeader';
import { CHAT_LIST } from '@/constants';
import styles from '../chat.module.css';

export const ChatsList = () => {
	const chatList = useCommonStore(state => state.chatList);

	const { messagesSlice, userId } = useMessagesSliceStore(state => ({
		messagesSlice: state.messagesSlice,
		userId: state.userId,
	}));

	const { selectedIds, isAllSelected, toggleAllSelected, addSelection, startSelection, dropSelectMode } =
		useSelect(chatList);

	const { push } = useRouter();

	const chatPressHandler = (id: string, chatId: string) => () => {
		if (selectedIds.length) {
			addSelection(id);
			return;
		}
		push(`${CHAT_LIST}/${chatId}`);
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
		<div className={styles.chatListWrapper} style={{ gridTemplateColumns: isSelectMode ? 'auto 70px' : 'auto' }}>
			<SelectModeHeader
				dropSelectMode={dropSelectMode}
				selectedNumber={selectedIds.length}
				onDelete={deleteChatsHandler}
				isAllSelected={isAllSelected}
				toggleAllSelected={toggleAllSelected}
			/>
			{chatList
				.sort((chatA, chatB) => {
					const lastMessageA = messagesSlice[chatA.chatId]?.lastMessage;
					const lastMessageB = messagesSlice[chatB.chatId]?.lastMessage;
					if (lastMessageA && lastMessageB) {
						return (
							Date.parse(lastMessageB.createdAt.toString()) -
							Date.parse(lastMessageA.createdAt.toString())
						);
					}
					if (lastMessageA && !lastMessageB) return -1;
					if (lastMessageB && !lastMessageA) return 1;
					return 0;
				})
				.map(({ chatId, id, members }) => {
					const [interlocutor] = members.filter(member => member.userId !== userId);
					return (
						<ChatListItem
							key={chatId}
							chatId={chatId}
							interlocutor={interlocutor}
							onPress={chatPressHandler(id, chatId)}
							onLongPress={chatLongPressHandler(id)}
							isSelectMode={isSelectMode}
							isChecked={selectedIds.includes(id)}
						/>
					);
				})}
		</div>
	);
};
