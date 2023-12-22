'use client';
import { createContext, ReactNode } from 'react';
import { useMessageMap } from '@/app/chat/hooks/useMessageMap';
import { MessageContextProps } from '@/types';

export const MessageContext = createContext<MessageContextProps>({} as MessageContextProps);

export const MessageProvider = ({ children }: { children: ReactNode }) => {
	const { messageMap, addReactionMap, updateIsReadMap } = useMessageMap();

	return (
		<MessageContext.Provider value={{ messageMap, addReactionMap, updateIsReadMap }}>
			{children}
		</MessageContext.Provider>
	);
};
