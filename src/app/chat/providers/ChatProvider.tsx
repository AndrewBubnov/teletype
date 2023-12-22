'use client';
import { createContext, ReactNode } from 'react';
import { useChatProviderSource } from '@/app/chat/hooks/useChatProviderSource';
import { ChatContextProps } from '@/types';

export const MessageContext = createContext<ChatContextProps>({} as ChatContextProps);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
	const { messageMap, addReactionMap, updateIsReadMap } = useChatProviderSource();

	return (
		<MessageContext.Provider value={{ messageMap, addReactionMap, updateIsReadMap }}>
			{children}
		</MessageContext.Provider>
	);
};
