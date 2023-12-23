import { useStore } from '@/store';
import { useEffect } from 'react';
import { clearActiveUsers, updateActiveUsers } from '@/utils/updateActiveUsers';
import { getUser } from '@/actions/getUser';
import { getUserChats } from '@/actions/getUserChats';
import { useUser } from '@clerk/nextjs';
import { addClientMessage, clearAddClientMessage } from '@/utils/addClientMessage';
import { clearUpdateClientMessage, updateClientMessage } from '@/utils/updateClientMessage';
import { sendJoin } from '@/utils/sendJoin';
import { clearUpdateChatList, updateChatList } from '@/utils/updateChatList';
import { getAllUserEmails } from '@/actions/getAllUserEmails';
import { initUserChat } from '@/utils/initUserChat';
import { createRooms } from '@/app/chat/utils/createRooms';
import { MessageMap } from '@/types';
import { useSubscribe } from '@/app/hooks/useSubscribe';

export const useAddSubscriptions = () => {
	const { user } = useUser();
	const userId = user?.id as string;

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
		(async function () {
			const user = await getUser();
			const userChats = await getUserChats(user.chatIds);
			const userEmails = await getAllUserEmails();
			setUserEmails(userEmails);
			setChatList(userChats);
			initUserChat(userChats);
			if (user.id) sendJoin(user.id);
			const map: MessageMap = userChats.reduce((acc, cur) => {
				acc[cur.chatId] = cur.messages;
				return acc;
			}, {} as MessageMap);
			setMessageMap(map);
		})();
	}, [setMessageMap, setChatList, setUserEmails]);

	useSubscribe(setActiveUsers, updateActiveUsers, clearActiveUsers);

	useSubscribe(addMessageToMessageMap, addClientMessage, clearAddClientMessage);

	useSubscribe(updateMessageInMessageMap, updateClientMessage, clearUpdateClientMessage);

	useSubscribe(setChatList, updateChatList, clearUpdateChatList);
};
