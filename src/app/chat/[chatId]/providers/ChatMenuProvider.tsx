import { createContext } from 'react';
import { ChatMenuContextProps, ChatMenuProviderProps } from '@/types';

export const ChatMenuContext = createContext<ChatMenuContextProps>({} as ChatMenuContextProps);

export const ChatMenuProvider = ({
	children,
	onClearChatHistory,
	onDeleteChat,
	chatId,
	interlocutorId,
	onDelete,
	isAllSelected,
	toggleAllSelected,
	selectedNumber,
	isSelectMode,
	dropSelectMode,
}: ChatMenuProviderProps) => (
	<ChatMenuContext.Provider
		value={{
			onClearChatHistory,
			onDeleteChat,
			chatId,
			interlocutorId,
			onDelete,
			isAllSelected,
			toggleAllSelected,
			selectedNumber,
			isSelectMode,
			dropSelectMode,
		}}
	>
		{children}
	</ChatMenuContext.Provider>
);
