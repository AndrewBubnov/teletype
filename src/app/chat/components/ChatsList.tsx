'use client';
import { useEffect, useState } from 'react';
import { useStore } from '@/store';
import { useRouter } from 'next/navigation';
import { Box, IconButton } from '@mui/material';
import { ChatListItem } from '@/app/chat/components/ChatListItem';
import { deleteChats } from '@/actions/deleteChats';
import { sendDeleteUserChats } from '@/utils/sendDeleteUserChats';
import { DeleteIcon } from '@/app/shared/styled';
import { ChatsListDeleteButton, ChatsListHeader, CloseIcon, SelectedCountWrapper } from '@/app/chat/styled';
import { CHAT_LIST } from '@/constants';

export const ChatsList = () => {
	const { chatList, userId } = useStore(state => ({
		chatList: state.chatList,
		userId: state.userId,
	}));

	const { push } = useRouter();
	const [isSelectMode, setIsSelectMode] = useState<boolean>(false);
	const [selectedChatIds, setSelectedChatIds] = useState<string[]>([]);

	useEffect(() => {
		if (!selectedChatIds.length) setIsSelectMode(false);
	}, [isSelectMode, selectedChatIds.length]);

	const chatPressHandler = (chatId: string) => () => {
		if (!isSelectMode) {
			push(`${CHAT_LIST}/${chatId}`);
		} else {
			setSelectedChatIds(prevState => {
				if (prevState.includes(chatId)) return prevState.filter(el => el !== chatId);
				return [...prevState, chatId];
			});
		}
	};

	const chatLongPressHandler = (chatId: string) => () => {
		if (!isSelectMode) setSelectedChatIds([chatId]);
		setIsSelectMode(prevState => !prevState);
	};

	const deleteChatsHandler = async () => {
		setIsSelectMode(false);
		sendDeleteUserChats(selectedChatIds);
		await deleteChats(selectedChatIds);
	};

	const dropSelectMode = () => setSelectedChatIds([]);

	return (
		<>
			<ChatsListHeader>
				{isSelectMode && (
					<>
						<SelectedCountWrapper>
							<IconButton onClick={dropSelectMode}>
								<CloseIcon />
							</IconButton>
							{selectedChatIds.length}
						</SelectedCountWrapper>
						<ChatsListDeleteButton onClick={deleteChatsHandler}>
							<DeleteIcon />
						</ChatsListDeleteButton>
					</>
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
							onPress={chatPressHandler(chatId)}
							onLongPress={chatLongPressHandler(chatId)}
							isSelectMode={isSelectMode}
						/>
					);
				})}
			</Box>
		</>
	);
};
