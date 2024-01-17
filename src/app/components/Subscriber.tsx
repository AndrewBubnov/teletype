'use client';
import { useCallback, useEffect } from 'react';
import { useMessageStore, useCommonStore } from '@/store';
import { useSubscribe } from '@/app/hooks/useSubscribe';
import { createRooms } from '@/app/chat/utils/createRooms';
import { initUserChats } from '@/webSocketActions/initUserChats';
import { sendJoin } from '@/webSocketActions/sendJoin';
import { clearActiveUsers, updateActiveUsers } from '@/webSocketActions/updateActiveUsers';
import { addClientMessage, clearAddClientMessage } from '@/webSocketActions/addClientMessage';
import { clearUpdateClientMessage, updateClientMessage } from '@/webSocketActions/updateClientMessage';
import { clearUpdateChatList, updateChatList } from '@/webSocketActions/updateChatList';
import { clearUpdateVisitorStatus, updateVisitorStatus } from '@/webSocketActions/updateVisitorStatus';
import { clearUpdateConnectionError, updateConnectionError } from '@/webSocketActions/updateConnectionError';
import { SERVER_CONNECTION_FAILED } from '@/app/constants';
import { SubscriberProps } from '@/types';

export const Subscriber = ({ userChats, userEmails, userId, messageMap }: SubscriberProps) => {
	const { setMessageMap, addMessageToMessageMap, updateMessageInMessageMap } = useMessageStore(state => ({
		setMessageMap: state.setMessageMap,
		addMessageToMessageMap: state.addMessageToMessageMap,
		updateMessageInMessageMap: state.updateMessageInMessageMap,
	}));

	const { setActiveUsers, setChatList, setUserEmails, chatList, setChatVisitorStatus, setUserId, setToast } =
		useCommonStore(state => ({
			setActiveUsers: state.setActiveUsers,
			chatList: state.chatList,
			setChatList: state.setChatList,
			setUserEmails: state.setUserEmails,
			setChatVisitorStatus: state.setChatVisitorStatus,
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
