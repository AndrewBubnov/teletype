import { createContext } from 'react';
import { MessageContextProps, MessageProviderProps } from '@/types';

export const MessageContext = createContext<MessageContextProps>({} as MessageContextProps);

export const MessageProvider = ({ children, messageContextProps }: MessageProviderProps) => (
	<MessageContext.Provider
		value={{
			...messageContextProps,
		}}
	>
		{children}
	</MessageContext.Provider>
);
