'use client';
import { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MainContext } from '@/app/chat/providers/MainProvider';
import { Box } from '@mui/material';
import { ChatListItem } from '@/app/chat/[chatId]/components/ChatListItem';
import { ChatsListDeleteButton, ChatsListHeader, DeleteIcon } from '@/app/chat/[chatId]/styled';
import { deleteChats } from '@/actions/deleteChats';
import { sendDeleteUserChats } from '@/utils/sendDeleteUserChats';
import { CHATS_LIST } from '@/constants';
import { Mode } from '@/types';

export const ChatsList = () => {
	const { push } = useRouter();
	const { chatList, userId } = useContext(MainContext);
	const [mode, setMode] = useState<Mode>('common');
	const [deletedChatIds, setDeletedChatIds] = useState<string[]>([]);

	const setActiveChat = (chatId: string) => () => push(`${CHATS_LIST}/${chatId}`);

	const toggleMode = (chatId: string) => () => {
		setMode(prevState => (prevState === 'common' ? 'delete' : 'common'));
		setDeletedChatIds(prevState => [...prevState, chatId]);
	};

	const deleteCheckboxHandler = (chatId: string) => () =>
		setDeletedChatIds(prevState => {
			if (prevState.includes(chatId)) return prevState.filter(el => el !== chatId);
			return [...prevState, chatId];
		});

	const deleteChatsHandler = async () => {
		setMode('common');
		sendDeleteUserChats(deletedChatIds);
		await deleteChats(deletedChatIds);
	};

	return (
		<>
			<ChatsListHeader>
				{mode === 'delete' && (
					<ChatsListDeleteButton onClick={deleteChatsHandler}>
						<DeleteIcon />
					</ChatsListDeleteButton>
				)}
			</ChatsListHeader>
			<Box>
				{chatList.map(({ chatId, members }) => {
					const [interlocutor] = members.filter(member => member.userId !== userId);
					return (
						<ChatListItem
							key={chatId}
							interlocutor={interlocutor}
							onPress={setActiveChat(chatId)}
							onLongPress={toggleMode(chatId)}
							mode={mode}
							onCheckboxToggle={deleteCheckboxHandler(chatId)}
							isChecked={deletedChatIds.includes(chatId)}
						/>
					);
				})}
			</Box>
		</>
	);
};
