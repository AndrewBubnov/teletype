import { create } from 'zustand';
import { MIN_LEFT_SIDE_WIDTH } from '@/constants';
import {
	ActiveChatStore,
	ChatVisitorStatus,
	CommonStore,
	IsWideModeStore,
	LeftSideWidthStore,
	Message,
	MessageMap,
	LastMessageStore,
	StatusStore,
	UserChat,
} from '@/types';
import { getLastChatMessage } from '@/prismaActions/getLastChatMessage';
import { getUnreadNumber } from '@/prismaActions/getUnreadNumber';

export const useLastMessageStore = create<LastMessageStore>(set => ({
	messageMap: {},
	setMessageMap: (updated: MessageMap) => set({ messageMap: updated }),
	addMessageToMessageMap: (message: Message) =>
		set(state => {
			if (!message.chatId) return { messageMap: state.messageMap };
			return {
				messageMap: {
					...state.messageMap,
					[message.chatId]: {
						lastMessage: message,
						unreadNumber: (state.messageMap[message.chatId]?.unreadNumber || 0) + 1,
					},
				},
			};
		}),
	updateMessage: async ({ roomId: chatId }) => {
		const [lastMessage, unreadNumber] = await Promise.all([getLastChatMessage(chatId), getUnreadNumber(chatId)]);
		set(state => ({
			messageMap: {
				...state.messageMap,
				[chatId]: { lastMessage, unreadNumber },
			},
		}));
	},
}));
export const useStatusStore = create<StatusStore>(set => ({
	activeUsers: [],
	chatVisitorStatus: {},
	setActiveUsers: (updated: string[]) => set({ activeUsers: updated }),
	setChatVisitorStatus: (updated: ChatVisitorStatus) => set({ chatVisitorStatus: updated }),
}));

export const useCommonStore = create<CommonStore>(set => ({
	chatList: [],
	userEmails: [],
	errorToastText: '',
	userId: '',
	setUserEmails: (updated: string[]) => set({ userEmails: updated }),
	setChatList: (updated: UserChat[]) => set({ chatList: updated }),
	setErrorToastText: (errorToastText: string) => set({ errorToastText }),
	setUserId: (userId: string) => set({ userId }),
}));

export const useActiveChatStore = create<ActiveChatStore>(set => ({
	activeChat: null,
	setActiveChat: (activeChat: UserChat) => set({ activeChat }),
}));

export const useIsWideModeStore = create<IsWideModeStore>(set => ({
	isWideMode: false,
	setIsWideMode: (isWideMode: boolean) => set({ isWideMode }),
}));

export const useLeftSideWidthStore = create<LeftSideWidthStore>(set => ({
	leftSideWidth: MIN_LEFT_SIDE_WIDTH,
	setLeftSideWidth: (leftSideWidth: number) => set({ leftSideWidth }),
}));
