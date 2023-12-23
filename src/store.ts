import { create } from 'zustand';
import { ChatVisitorStatus, Message, MessageMap, Store, UserChat } from '@/types';
import { updateMessageIsRead } from '@/actions/updateMessageIsRead';

export const useStore = create<Store>(set => ({
	activeUsers: [],
	chatList: [],
	userEmails: [],
	setActiveUsers: (updated: string[]) => set({ activeUsers: updated }),
	setUserEmails: (updated: string[]) => set({ activeUsers: updated }),
	setChatList: (updated: UserChat[]) => set({ chatList: updated }),
	chatVisitorStatus: {},
	setChatVisitorStatus: (updated: ChatVisitorStatus) => set({ chatVisitorStatus: updated }),
	messageMap: {},
	setMessageMap: (updated: MessageMap) => set({ messageMap: updated }),
	addMessageToMessageMap: (message: Message) =>
		set(state => {
			if (!message.chatId) return { messageMap: state.messageMap };
			if (state.messageMap[message.chatId])
				return {
					messageMap: {
						...state.messageMap,
						[message.chatId]: [...state.messageMap[message.chatId], message],
					},
				};
			return { messageMap: { ...state.messageMap, [message.chatId]: [message] } };
		}),
	updateMessageInMessageMap: ({ message, messageId, roomId: chatId }) =>
		set(state => {
			if (!message) {
				return {
					messageMap: {
						...state.messageMap,
						[chatId]: state.messageMap[chatId].filter(el => el.id !== messageId),
					},
				};
			}
			return {
				messageMap: {
					...state.messageMap,
					[chatId]: state.messageMap[chatId].map(el => (el.id === messageId ? message : el)),
				},
			};
		}),
	updateIsReadMap: (chatId: string, userId: string) => async (id: string) => {
		await updateMessageIsRead(id);
		return set(state => {
			const predicate = (el: Message): boolean => el.id === id && el.authorId !== userId;
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
	addReactionMap: (chatId: string, authorImageUrl: string | null | undefined) => (id: string, reaction: string) =>
		set(state => ({
			messageMap: {
				...state.messageMap,
				[chatId]: state.messageMap[chatId].map(message => {
					if (message.id === id) {
						return { ...message, reaction, reactionAuthorImageUrl: reaction ? authorImageUrl : null };
					}
					return message;
				}),
			},
		})),
}));
