'use client';
import { useCommonStore } from '@/store';
import { useRouter } from 'next/navigation';
import { sendDeleteUserChats } from '@/webSocketActions/sendDeleteUserChats';
import { deleteChats } from '@/prismaActions/deleteChats';
import { useSelect } from '@/app/shared/hooks/useSelect';
import { ChatListItem } from '@/app/chat/components/ChatListItem';
import { ChatListWrapper } from '@/app/chat/styled';
import { SelectModeHeader } from '@/app/shared/components/SelectModeHeader';

import { CHAT_LIST } from '@/constants';
export const ChatsList = () => {
	const { chatList, userId } = useCommonStore(state => ({
		chatList: state.chatList,
		userId: state.userId,
	}));

	const { selectedIds, isAllSelected, toggleAllSelected, addSelection, startSelection, dropSelectMode } =
		useSelect(chatList);

	const { push } = useRouter();

	const chatPressHandler = (id: string, chatId: string) => () => {
		if (selectedIds.length) {
			addSelection(id);
		} else {
			push(`${CHAT_LIST}/${chatId}`);
		}
	};

	const chatLongPressHandler = (id: string) => startSelection(id);

	const deleteChatsHandler = async () => {
		sendDeleteUserChats(selectedIds);
		dropSelectMode();
		const chatIds = chatList.filter(({ id }) => selectedIds.includes(id)).map(({ chatId }) => chatId);
		await deleteChats(selectedIds, chatIds);
	};

	const isSelectMode = !!selectedIds.length;

	return (
		<ChatListWrapper isSelectMode={isSelectMode}>
			<SelectModeHeader
				dropSelectMode={dropSelectMode}
				selectedNumber={selectedIds.length}
				onDelete={deleteChatsHandler}
				isAllSelected={isAllSelected}
				toggleAllSelected={toggleAllSelected}
			/>
			{chatList.map(({ chatId, id, members }) => {
				const [interlocutor] = members.filter(member => member.userId !== userId);
				return (
					<ChatListItem
						key={chatId}
						chatId={chatId}
						interlocutor={interlocutor}
						onPress={chatPressHandler(id, chatId)}
						onLongPress={chatLongPressHandler(id)}
						isSelectMode={isSelectMode}
						isSelected={selectedIds.includes(id)}
					/>
				);
			})}
		</ChatListWrapper>
	);
};
