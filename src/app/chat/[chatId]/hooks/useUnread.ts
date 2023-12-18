import { useEffect, useState } from 'react';
import { addClientMessage, clearAddClientMessage } from '@/utils/addClientMessage';
import { Message } from '@/types';

export const useUnread = (unreadNumberStored: number, lastMessageStored: Message | null) => {
	const [unreadNumber, setUnreadNumber] = useState<number>(unreadNumberStored);
	const [lastMessage, setLastMessage] = useState<Message | null>(lastMessageStored);

	useEffect(() => {
		const handler = (message: Message) => {
			setUnreadNumber(prevState => prevState + 1);
			setLastMessage(message);
		};
		addClientMessage(handler);
		return () => {
			clearAddClientMessage(handler);
		};
	}, []);

	return { unreadNumber, lastMessage };
};
