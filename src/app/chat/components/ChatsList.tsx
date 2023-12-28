'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { Box } from '@mui/material';
import { ChatListItem } from '@/app/chat/components/ChatListItem';
import { ChatsListDeleteButton, ChatsListHeader, DeleteIcon } from '@/app/chat/[chatId]/styled';
import { deleteChats } from '@/actions/deleteChats';
import { sendDeleteUserChats } from '@/utils/sendDeleteUserChats';
import { CHAT_LIST } from '@/constants';
import { useStore } from '@/store';

export const ChatsList = () => {
	const { user } = useUser();
	const userId = user?.id as string;

	const { push } = useRouter();
	const { chatList } = useStore();

	const [isDeleteMode, setIsDeleteMode] = useState<boolean>(false);
	const [deletedChatIds, setDeletedChatIds] = useState<string[]>([]);

	const setActiveChat = (chatId: string) => () => push(`${CHAT_LIST}/${chatId}`);

	const toggleMode = (chatId: string) => () => {
		if (!isDeleteMode) setDeletedChatIds(prevState => [...prevState, chatId]);
		setIsDeleteMode(prevState => !prevState);
	};

	const deleteCheckboxHandler = (chatId: string) => () =>
		setDeletedChatIds(prevState => {
			if (prevState.includes(chatId)) return prevState.filter(el => el !== chatId);
			return [...prevState, chatId];
		});

	const deleteChatsHandler = async () => {
		setIsDeleteMode(false);
		sendDeleteUserChats(deletedChatIds);
		await deleteChats(deletedChatIds);
	};

	return (
		<>
			<ChatsListHeader>
				{isDeleteMode && (
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
							chatId={chatId}
							interlocutor={interlocutor}
							onPress={setActiveChat(chatId)}
							onLongPress={toggleMode(chatId)}
							isDeleteMode={isDeleteMode}
							onCheckboxToggle={deleteCheckboxHandler(chatId)}
							isChecked={deletedChatIds.includes(chatId)}
						/>
					);
				})}
			</Box>
		</>
	);
};
