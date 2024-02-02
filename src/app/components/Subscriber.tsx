'use client';
import { useCallback, useEffect } from 'react';
import { useMessagesSliceStore, useCommonStore } from '@/store';
import { useSubscribe } from '@/app/hooks/useSubscribe';
import { createRooms } from '@/app/chat/utils/createRooms';
import { initUserChats } from '@/webSocketActions/initUserChats';
import { sendJoin } from '@/webSocketActions/sendJoin';
import { clearActiveUsers, updateActiveUsers } from '@/webSocketActions/updateActiveUsers';
import { clearUpdateChatList, updateChatList } from '@/webSocketActions/updateChatList';
import { clearUpdateVisitorStatus, updateVisitorStatus } from '@/webSocketActions/updateVisitorStatus';
import { clearUpdateConnectionError, updateConnectionError } from '@/webSocketActions/updateConnectionError';
import { SERVER_CONNECTION_FAILED } from '@/app/constants';
import { SubscriberProps } from '@/types';

export const Subscriber = ({ userChats, userEmails, userId, messageMap, messagesSlice }: SubscriberProps) => {
	const { setMessagesSlice } = useMessagesSliceStore(state => ({
		setMessagesSlice: state.setMessagesSlice,
	}));

	const { setActiveUsers, setChatList, setUserEmails, chatList, setChatVisitorStatus, setUserId, setToast } =
		useCommonStore(state => ({
			setActiveUsers: state.setActiveUsers,
			chatList: state.chatList,
			setChatList: state.setChatList,
			setUserEmails: state.setUserEmails,
			setChatVisitorStatus: state.setChatVisitorStatus,
			setUserId: state.setUserId,
			setToast: state.setErrorToastText,
		}));

	useEffect(() => {
		initUserChats(userChats);
	}, [userChats]);

	useEffect(() => {
		sendJoin(userId);
	}, [userId]);

	useEffect(() => createRooms(chatList, userId), [chatList, userId]);

	useEffect(() => {
		setMessagesSlice(messagesSlice);
	}, [setMessagesSlice, messagesSlice]);

	useEffect(() => {
		setUserEmails(userEmails);
		setChatList(userChats);
	}, [setChatList, setUserEmails, userEmails, userChats]);

	useEffect(() => {
		setUserId(userId);
	}, [setUserId, userId]);

	const setErrorToast = useCallback(() => setToast(SERVER_CONNECTION_FAILED), [setToast]);

	useSubscribe(setActiveUsers, updateActiveUsers, clearActiveUsers);

	useSubscribe(setChatList, updateChatList, clearUpdateChatList);

	useSubscribe(setChatVisitorStatus, updateVisitorStatus, clearUpdateVisitorStatus);

	useSubscribe(setErrorToast, updateConnectionError, clearUpdateConnectionError);

	return null;
};
