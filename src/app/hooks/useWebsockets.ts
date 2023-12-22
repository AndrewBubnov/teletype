import { useStore } from '@/store';
import { useEffect } from 'react';
import { updateActiveUsers } from '@/utils/updateActiveUsers';
import { getUser } from '@/actions/getUser';
import { getUserChats } from '@/actions/getUserChats';
import { addClientMessage, clearAddClientMessage } from '@/utils/addClientMessage';
import { clearUpdateClientMessage, updateClientMessage } from '@/utils/updateClientMessage';
import { MessageMap } from '@/types';
import { sendJoin } from '@/utils/sendJoin';

export const useWebsockets = () => {
	const { setActiveUsers, setMessageMap, addMessageToMessageMap, updateMessageInMessageMap } = useStore(state => ({
		setActiveUsers: state.setActiveUsers,
		setMessageMap: state.setMessageMap,
		addMessageToMessageMap: state.addMessageToMessageMap,
		updateMessageInMessageMap: state.updateMessageInMessageMap,
	}));

	useEffect(() => {
		updateActiveUsers(setActiveUsers);
	}, [setActiveUsers]);

	useEffect(() => {
		(async function () {
			const user = await getUser();
			const userChats = await getUserChats(user.chatIds);
			if (user.id) sendJoin(user.id);
			const map: MessageMap = userChats.reduce((acc, cur) => {
				acc[cur.chatId] = cur.messages;
				return acc;
			}, {} as MessageMap);
			setMessageMap(map);
		})();
	}, [setMessageMap]);

	useEffect(() => {
		addClientMessage(addMessageToMessageMap);
		return () => {
			clearAddClientMessage(addMessageToMessageMap);
		};
	}, [addMessageToMessageMap]);

	useEffect(() => {
		updateClientMessage(updateMessageInMessageMap);
		return () => {
			clearUpdateClientMessage(updateMessageInMessageMap);
		};
	}, [updateMessageInMessageMap]);
};
