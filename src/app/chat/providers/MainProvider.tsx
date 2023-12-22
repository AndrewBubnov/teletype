'use client';
import { createContext, useEffect } from 'react';
import { useUpdateData } from '@/app/hooks/useUpdateData';
import { useLatest } from '@/app/chat/hooks/useLatest';
import { updateChatList } from '@/utils/updateChatList';
import { createRooms } from '@/app/chat/utils/createRooms';
import { initUserChat } from '@/utils/initUserChat';
import { UserChat, MainContextProps, MainProviderProps } from '@/types';

export const MainContext = createContext({} as MainContextProps);

export const MainProvider = ({ userEmails, userId, userChats, children }: MainProviderProps) => {
	const chatList = useUpdateData<UserChat[]>(updateChatList, userChats);

	const userChatsRef = useLatest(userChats);

	useEffect(() => {
		initUserChat(userChatsRef.current);
	}, [userChatsRef]);

	useEffect(() => createRooms(userChats, userId), [userChats, userId]);

	return <MainContext.Provider value={{ userEmails, chatList }}>{children}</MainContext.Provider>;
};
