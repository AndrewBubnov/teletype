'use client';
import { useCallback, useEffect } from 'react';
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
import { clearUpdateConnectionError, updateConnectionError } from '@/utils/updateConnectionError';
import { SERVER_CONNECTION_FAILED } from '@/app/constants';
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
		setUserId,
		setToast,
	} = useStore(state => ({
		setActiveUsers: state.setActiveUsers,
		chatList: state.chatList,
		setMessageMap: state.setMessageMap,
		setChatList: state.setChatList,
		setUserEmails: state.setUserEmails,
		setChatVisitorStatus: state.setChatVisitorStatus,
		addMessageToMessageMap: state.addMessageToMessageMap,
		updateMessageInMessageMap: state.updateMessageInMessageMap,
		setUserId: state.setUserId,
		setToast: state.setToast,
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

	useEffect(() => {
		setUserId(userId);
	}, [setUserId, userId]);

	const setErrorToast = useCallback(() => setToast({ text: SERVER_CONNECTION_FAILED, type: 'error' }), [setToast]);

	useSubscribe(setActiveUsers, updateActiveUsers, clearActiveUsers);

	useSubscribe(addMessageToMessageMap, addClientMessage, clearAddClientMessage);

	useSubscribe(updateMessageInMessageMap, updateClientMessage, clearUpdateClientMessage);

	useSubscribe(setChatList, updateChatList, clearUpdateChatList);

	useSubscribe(setChatVisitorStatus, updateVisitorStatus, clearUpdateVisitorStatus);

	useSubscribe(setErrorToast, updateConnectionError, clearUpdateConnectionError);

	return null;
};
