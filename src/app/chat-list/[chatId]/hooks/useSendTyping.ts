import { useEffect, useRef } from 'react';
import { sendIsTyping } from '@/webSocketActions/sendIsTyping';
import { CANCEL_IS_TYPING_DELAY } from '@/app/chat-list/[chatId]/constants';

export const useSendTyping = (interlocutorId: string, text: string) => {
	const timeout = useRef<number>(0);
	useEffect(() => {
		if (timeout.current) window.clearTimeout(timeout.current);
		timeout.current = window.setTimeout(() => sendIsTyping(interlocutorId, false), CANCEL_IS_TYPING_DELAY);
		sendIsTyping(interlocutorId, !!text.length);
	}, [interlocutorId, text.length]);
};
