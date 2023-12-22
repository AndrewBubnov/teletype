'use client';
import { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MainContext } from '@/app/chat/providers/MainProvider';
import { Box } from '@mui/material';
import { ChatListItem } from '@/app/chat/components/ChatListItem';
import { ChatsListDeleteButton, ChatsListHeader, DeleteIcon } from '@/app/chat/[chatId]/styled';
import { deleteChats } from '@/actions/deleteChats';
import { sendDeleteUserChats } from '@/utils/sendDeleteUserChats';
import { CHATS_LIST } from '@/constants';
import { MessageContext } from '@/app/chat/providers/MessageProvider';

export const ChatsList = () => {
	const { push } = useRouter();
	const { chatList, userId } = useContext(MainContext);

	const [isDeleteMode, setIsDeleteMode] = useState<boolean>(false);
	const [deletedChatIds, setDeletedChatIds] = useState<string[]>([]);

	const setActiveChat = (chatId: string) => () => push(`${CHATS_LIST}/${chatId}`);

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
				{chatList.map(({ chatId, members, messages }) => {
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
