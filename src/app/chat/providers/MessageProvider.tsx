'use client';
import { createContext, ReactNode } from 'react';
import { useChatProviderSource } from '@/app/chat/hooks/useChatProviderSource';
import { MessageContextProps } from '@/types';

export const MessageContext = createContext<MessageContextProps>({} as MessageContextProps);

export const MessageProvider = ({ children }: { children: ReactNode }) => {
	const { messageMap, addReactionMap, updateIsReadMap } = useChatProviderSource();

	return (
		<MessageContext.Provider value={{ messageMap, addReactionMap, updateIsReadMap }}>
			{children}
		</MessageContext.Provider>
	);
};
