import { create } from 'zustand';
import { getChatByChatId } from '@/prismaActions/getChatByChatId';
import { MIN_LEFT_SIDE_WIDTH } from '@/constants';
import {
	ActiveChatStore,
	ChatVisitorStatus,
	CommonStore,
	IsWideModeStore,
	LeftSideWidthStore,
	Message,
	StatusStore,
	UnreadMessageMap,
	UnreadMessagesStore,
	UpdateMessage,
	UserChat,
	DraftMessageStore,
} from '@/types';
import { addMessageInStore } from '@/utils/addMessageInStore';
import { updateIsReadInState } from '@/utils/updateIsReadInState';
import { getUnreadNumber } from '@/prismaActions/getUnreadNumber';
import { getLastChatMessage } from '@/prismaActions/getLastChatMessage';

export const useUnreadMessagesStore = create<UnreadMessagesStore>(set => ({
	messageMap: {},
	setMessageMap: (updated: UnreadMessageMap) => set({ messageMap: updated }),
	addMessageToMessageMap: (message: Message) => set(state => addMessageInStore(state, message)),
	updateUnreadMessages: async ({ roomId }: UpdateMessage) => {
		const unreadNumber = await getUnreadNumber(roomId);
		const lastMessage = await getLastChatMessage(roomId);
		set(state => ({
			messageMap: {
				...state.messageMap,
				[roomId]: {
					unreadNumber,
					lastMessage,
				},
			},
		}));
	},
	updateIsReadUnreadMessages: (message: Message) => set(state => updateIsReadInState(state, message.chatId)),
}));

export const useDraftMessageStore = create<DraftMessageStore>(set => ({
	draftMap: {},
	addDraft: (draft: string, chatId: string) =>
		set(state => ({
			draftMap: {
				...state.draftMap,
				[chatId]: draft,
			},
		})),
	removeDraft: (chatId: string) =>
		set(state => {
			const updated = { ...state.draftMap };
			delete updated[chatId];
			return { draftMap: updated };
		}),
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
	isActiveChatLoading: false,
	activeChat: null,
	setActiveChat: async chatId => {
		set({ isActiveChatLoading: true });
		const chat = await getChatByChatId(chatId);
		set({ activeChat: chat, isActiveChatLoading: false });
	},
}));

export const useIsWideModeStore = create<IsWideModeStore>(set => ({
	isWideMode: false,
	setIsWideMode: (isWideMode: boolean) => set({ isWideMode }),
}));

export const useLeftSideWidthStore = create<LeftSideWidthStore>(set => ({
	leftSideWidth: MIN_LEFT_SIDE_WIDTH,
	setLeftSideWidth: (leftSideWidth: number) => set({ leftSideWidth }),
}));
