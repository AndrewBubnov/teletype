import { create } from 'zustand';
import { ChatVisitorStatus, CommonStore, MessagesSlice, MessagesSliceStore, UserChat } from '@/types';

export const useMessagesSliceStore = create<MessagesSliceStore>(set => ({
	messagesSlice: {},
	setMessagesSlice: (updated: MessagesSlice) => set({ messagesSlice: updated }),
	addChatMessage: message =>
		set(state => {
			const isCompanion = state.userId !== message.authorId;
			const unreadNumber = state.messagesSlice[message.chatId]?.unreadNumber || 0;
			return {
				messagesSlice: {
					...state.messagesSlice,
					[message.chatId]: {
						lastMessage: message,
						unreadNumber: unreadNumber + (isCompanion ? 1 : 0),
					},
				},
			};
		}),
	reduceMessagesSliceUnread: chatId =>
		set(state => {
			const unreadNumber = state.messagesSlice[chatId]?.unreadNumber || 0;
			return {
				messagesSlice: {
					...state.messagesSlice,
					[chatId]: {
						...state.messagesSlice[chatId],
						unreadNumber: Math.max(unreadNumber - 1, 0),
					},
				},
			};
		}),
	userId: '',
	setUserId: (userId: string) => set({ userId }),
}));

export const useCommonStore = create<CommonStore>(set => ({
	activeUsers: [],
	chatList: [],
	userEmails: [],
	chatVisitorStatus: {},
	errorToastText: '',
	setActiveUsers: (updated: string[]) => set({ activeUsers: updated }),
	setUserEmails: (updated: string[]) => set({ userEmails: updated }),
	setChatList: (updated: UserChat[]) => set({ chatList: updated }),
	setChatVisitorStatus: (updated: ChatVisitorStatus) => set({ chatVisitorStatus: updated }),
	setErrorToastText: (errorToastText: string) => set({ errorToastText }),
}));
