'use client';
import { useEffect } from 'react';
import { useStore } from '@/store';
import { useSubscribe } from '@/app/hooks/useSubscribe';
import { createRooms } from '@/app/chat/utils/createRooms';
import { initUserChats } from '@/utils/initUserChats';
import { sendJoin } from '@/utils/sendJoin';
import { clearActiveUsers, updateActiveUsers } from '@/utils/updateActiveUsers';
import { addClientMessage, clearAddClientMessage } from '@/utils/addClientMessage';
import { clearUpdateClientMessage, updateClientMessage } from '@/utils/updateClientMessage';
import { clearUpdateChatList, updateChatList } from '@/utils/updateChatList';
import { clearUpdateVisitorStatus, updateVisitorStatus } from '@/utils/updateVisitorStatus';
import { SubscriberProps } from '@/types';

export const Subscriber = ({ userChats, userEmails, userId, messageMap }: SubscriberProps) => {
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

	useEffect(() => {
		initUserChats(userChats);
	}, [userChats]);

	useEffect(() => {
		sendJoin(userId);
	}, [userId]);

	useEffect(() => createRooms(chatList, userId), [chatList, userId]);

	useEffect(() => {
		setMessageMap(messageMap);
	}, [setMessageMap, messageMap]);

	useEffect(() => {
		setUserEmails(userEmails);
		setChatList(userChats);
	}, [setChatList, setUserEmails, userEmails, userChats]);

	useSubscribe(setActiveUsers, updateActiveUsers, clearActiveUsers);

	useSubscribe(addMessageToMessageMap, addClientMessage, clearAddClientMessage);

	useSubscribe(updateMessageInMessageMap, updateClientMessage, clearUpdateClientMessage);

	useSubscribe(setChatList, updateChatList, clearUpdateChatList);

	useSubscribe(setChatVisitorStatus, updateVisitorStatus, clearUpdateVisitorStatus);

	return null;
};
