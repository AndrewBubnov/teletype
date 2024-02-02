import { create } from 'zustand';
import { updateMessageIsRead } from '@/prismaActions/updateMessageIsRead';
import { addReaction } from '@/prismaActions/addReaction';
import { sendEditMessage } from '@/webSocketActions/sendEditMessage';
import {
	ChatVisitorStatus,
	CommonStore,
	Message,
	MessageMap,
	MessagesSlice,
	MessageStore,
	UpdateMessageType,
	UserChat,
} from '@/types';

export const useMessageStore = create<MessageStore>(set => ({
	messageMap: {},
	messagesSlice: {},
	setMessageMap: (updated: MessageMap) => set({ messageMap: updated }),
	setMessagesSlice: (updated: MessagesSlice) => set({ messagesSlice: updated }),
	updateIsRead: async (message: Message) => {
		const { id, chatId } = message;
		const updated = await updateMessageIsRead(id);
		if (updated) {
			sendEditMessage({
				updateData: { [id]: updated },
				type: UpdateMessageType.EDIT,
				roomId: chatId,
			});
		}
		return set(state => {
			const predicate = (el: Message): boolean => el.id === id;
			const message = state.messageMap[chatId].find(predicate);
			if (message && !message?.isRead) {
				return {
					messageMap: {
						...state.messageMap,
						[chatId]: state.messageMap[chatId].map(el => (predicate(el) ? { ...el, isRead: true } : el)),
					},
				};
			}
			return state;
		});
	},
	addReaction: async (message: Message, reaction: string, authorImageUrl: string | null | undefined) => {
		const { id: messageId, chatId } = message;
		const updated = await addReaction({ messageId, reaction, authorImageUrl });
		if (updated) {
			sendEditMessage({
				updateData: { [messageId]: updated },
				type: UpdateMessageType.EDIT,
				roomId: chatId,
			});
		}
		set(state => ({
			messageMap: {
				...state.messageMap,
				[chatId]: state.messageMap[chatId].map(message => {
					if (message.id === messageId) {
						return {
							...message,
							reaction,
							reactionAuthorImageUrl: reaction ? authorImageUrl : undefined,
						};
					}
					return message;
				}),
			},
		}));
	},
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
