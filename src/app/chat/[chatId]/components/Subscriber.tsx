'use client';
import { MessageMap, UserChat } from '@/types';
import { useStore } from '@/store';
import { useEffect } from 'react';
import { createRooms } from '@/app/chat/utils/createRooms';
import { initUserChat } from '@/utils/initUserChat';
import { sendJoin } from '@/utils/sendJoin';
import { useSubscribe } from '@/app/hooks/useSubscribe';
import { clearActiveUsers, updateActiveUsers } from '@/utils/updateActiveUsers';
import { addClientMessage, clearAddClientMessage } from '@/utils/addClientMessage';
import { clearUpdateClientMessage, updateClientMessage } from '@/utils/updateClientMessage';
import { clearUpdateChatList, updateChatList } from '@/utils/updateChatList';

export const Subscriber = ({
	userChats,
	userEmails,
	userId,
}: {
	userChats: UserChat[];
	userEmails: string[];
	userId: string;
}) => {
	const {
		setActiveUsers,
		setMessageMap,
		addMessageToMessageMap,
		updateMessageInMessageMap,
		setChatList,
		setUserEmails,
		chatList,
	} = useStore(state => ({
		setActiveUsers: state.setActiveUsers,
		chatList: state.chatList,
		setMessageMap: state.setMessageMap,
		setChatList: state.setChatList,
		setUserEmails: state.setUserEmails,
		addMessageToMessageMap: state.addMessageToMessageMap,
		updateMessageInMessageMap: state.updateMessageInMessageMap,
	}));

	useEffect(() => createRooms(chatList, userId), [chatList, userId]);

	useEffect(() => {
		setUserEmails(userEmails);
		setChatList(userChats);
		initUserChat(userChats);
		sendJoin(userId);
		const map: MessageMap = userChats.reduce((acc, cur) => {
			acc[cur.chatId] = cur.messages;
			return acc;
		}, {} as MessageMap);
		setMessageMap(map);
	}, [setMessageMap, setChatList, setUserEmails, userEmails, userChats, userId]);

	useSubscribe(setActiveUsers, updateActiveUsers, clearActiveUsers);

	useSubscribe(addMessageToMessageMap, addClientMessage, clearAddClientMessage);

	useSubscribe(updateMessageInMessageMap, updateClientMessage, clearUpdateClientMessage);

	useSubscribe(setChatList, updateChatList, clearUpdateChatList);

	return null;
};
