'use client';
import { useCallback, useEffect } from 'react';
import { useMessageStore, useCommonStore, useStatusStore, useIsWideModeStore, useActiveChatStore } from '@/store';
import { useSubscribe } from '@/app/hooks/useSubscribe';
import { useFirstLoad } from '@/app/hooks/useFirstLoad';
import { createRooms } from '@/app/chat-list/utils/createRooms';
import { initUserChats } from '@/webSocketActions/initUserChats';
import { sendJoin } from '@/webSocketActions/sendJoin';
import { clearActiveUsers, updateActiveUsers } from '@/webSocketActions/updateActiveUsers';
import { addClientMessage, clearAddClientMessage } from '@/webSocketActions/addClientMessage';
import { clearUpdateClientMessage, updateClientMessage } from '@/webSocketActions/updateClientMessage';
import { clearUpdateChatList, updateChatList } from '@/webSocketActions/updateChatList';
import { clearUpdateVisitorStatus, updateVisitorStatus } from '@/webSocketActions/updateVisitorStatus';
import { clearUpdateConnectionError, updateConnectionError } from '@/webSocketActions/updateConnectionError';
import { getAllUserEmails } from '@/prismaActions/getAllUserEmails';
import { SERVER_CONNECTION_FAILED } from '@/app/constants';
import { SubscriberProps, UserChat } from '@/types';

export const Subscriber = ({ userChats, userEmails, userId, messageMap }: SubscriberProps) => {
	const { setMessageMap, addMessageToMessageMap, updateMessageInMessageMap } = useMessageStore(state => ({
		setMessageMap: state.setMessageMap,
		addMessageToMessageMap: state.addMessageToMessageMap,
		updateMessageInMessageMap: state.updateMessageInMessageMap,
	}));

	const { setChatList, setUserEmails, chatList, setUserId, setToast } = useCommonStore(state => ({
		chatList: state.chatList,
		setChatList: state.setChatList,
		setUserEmails: state.setUserEmails,
		setUserId: state.setUserId,
		setToast: state.setErrorToastText,
	}));

	const { setActiveUsers, setChatVisitorStatus } = useStatusStore(state => ({
		setActiveUsers: state.setActiveUsers,
		setChatVisitorStatus: state.setChatVisitorStatus,
	}));

	const setActiveChat = useActiveChatStore(state => state.setActiveChat);

	const setIsWideMode = useIsWideModeStore(state => state.setIsWideMode);

	useFirstLoad(initUserChats, userChats);

	useFirstLoad(setUserEmails, userEmails);

	useFirstLoad(setChatList, userChats);

	useFirstLoad(setMessageMap, messageMap);

	useFirstLoad(setUserId, userId);

	useFirstLoad(sendJoin, userId);

	useEffect(() => createRooms(chatList, userId), [chatList, userId]);

	useEffect(() => {
		const handler = () => {
			const isWideMode = window.matchMedia('(min-width: 1024px)').matches;
			setIsWideMode(isWideMode);
		};
		handler();
		window.addEventListener('resize', handler);
		return () => window.removeEventListener('resize', handler);
	}, [setIsWideMode]);

	const setErrorToast = useCallback(() => setToast(SERVER_CONNECTION_FAILED), [setToast]);

	const chatListChangeHandler = useCallback(
		async (updated: UserChat[]) => {
			setActiveChat(null);
			setChatList(updated);
			const userEmails = await getAllUserEmails();
			setUserEmails(userEmails);
		},
		[setActiveChat, setChatList, setUserEmails]
	);

	useSubscribe(setActiveUsers, updateActiveUsers, clearActiveUsers);

	useSubscribe(addMessageToMessageMap, addClientMessage, clearAddClientMessage);

	useSubscribe(updateMessageInMessageMap, updateClientMessage, clearUpdateClientMessage);

	useSubscribe(chatListChangeHandler, updateChatList, clearUpdateChatList);

	useSubscribe(setChatVisitorStatus, updateVisitorStatus, clearUpdateVisitorStatus);

	useSubscribe(setErrorToast, updateConnectionError, clearUpdateConnectionError);

	return null;
};
