import { create } from 'zustand';
import { addMessageReaction } from '@/prismaActions/addMessageReaction';
import { sendEditMessage } from '@/webSocketActions/sendEditMessage';
import { ChatVisitorStatus, CommonStore, MessagesSlice, MessagesSliceStore, UserChat } from '@/types';

export const useMessagesSliceStore = create<MessagesSliceStore>(set => ({
	messagesSlice: {},
	setMessagesSlice: (updated: MessagesSlice) => set({ messagesSlice: updated }),
}));
export const useCommonStore = create<CommonStore>(set => ({
	activeUsers: [],
	chatList: [],
	userEmails: [],
	chatVisitorStatus: {},
	errorToastText: '',
	userId: '',
	setActiveUsers: (updated: string[]) => set({ activeUsers: updated }),
	setUserEmails: (updated: string[]) => set({ userEmails: updated }),
	setChatList: (updated: UserChat[]) => set({ chatList: updated }),
	setChatVisitorStatus: (updated: ChatVisitorStatus) => set({ chatVisitorStatus: updated }),
	setErrorToastText: (errorToastText: string) => set({ errorToastText }),
	setUserId: (userId: string) => set({ userId }),
}));
