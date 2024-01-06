'use client';
import { useEffect } from 'react';
import { useStore } from '@/store';
import { useSubscribe } from '@/app/hooks/useSubscribe';
import { createRooms } from '@/app/chat/utils/createRooms';
import { initUserChats } from '@/utils/initUserChats';
import { sendJoin } from '@/utils/sendJoin';
import { createMessageMap, clearMessageMap } from '@/utils/createMessageMap';
import { clearActiveUsers, updateActiveUsers } from '@/utils/updateActiveUsers';
import { addClientMessage, clearAddClientMessage } from '@/utils/addClientMessage';
import { clearUpdateClientMessage, updateClientMessage } from '@/utils/updateClientMessage';
import { clearUpdateChatList, updateChatList } from '@/utils/updateChatList';
import { clearUpdateVisitorStatus, updateVisitorStatus } from '@/utils/updateVisitorStatus';
import { UserChat } from '@/types';

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
		setChatVisitorStatus,
	} = useStore(state => ({
		setActiveUsers: state.setActiveUsers,
		chatList: state.chatList,
		setMessageMap: state.setMessageMap,
		setChatList: state.setChatList,
		setUserEmails: state.setUserEmails,
		setChatVisitorStatus: state.setChatVisitorStatus,
		addMessageToMessageMap: state.addMessageToMessageMap,
		updateMessageInMessageMap: state.updateMessageInMessageMap,
	}));

	useEffect(() => createRooms(chatList, userId), [chatList, userId]);

	useEffect(() => {
		setUserEmails(userEmails);
		setChatList(userChats);
		initUserChats(userChats);
		sendJoin(userId);
	}, [setChatList, setUserEmails, userEmails, userChats, userId]);

	useSubscribe(setMessageMap, createMessageMap, clearMessageMap);

	useSubscribe(setActiveUsers, updateActiveUsers, clearActiveUsers);

	useSubscribe(addMessageToMessageMap, addClientMessage, clearAddClientMessage);

	useSubscribe(updateMessageInMessageMap, updateClientMessage, clearUpdateClientMessage);

	useSubscribe(setChatList, updateChatList, clearUpdateChatList);

	useSubscribe(setChatVisitorStatus, updateVisitorStatus, clearUpdateVisitorStatus);

	return null;
};
