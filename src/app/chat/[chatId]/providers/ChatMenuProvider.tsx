import { createContext } from 'react';
import { ChatMenuContextProps, ChatMenuProviderProps } from '@/types';

export const ChatMenuContext = createContext<ChatMenuContextProps>({} as ChatMenuContextProps);

export const ChatMenuProvider = ({ children, onClearChatHistory, onDeleteChat }: ChatMenuProviderProps) => (
	<ChatMenuContext.Provider value={{ onClearChatHistory, onDeleteChat }}>{children}</ChatMenuContext.Provider>
);
