import { create } from 'zustand';
import { ChatVisitorStatus, Message, MessageMap, Store, UserChat } from '@/types';
import { sendChangeMessageIsRead } from '@/utils/sendChangeMessageIsRead';
import { sendAddReaction } from '@/utils/sendAddReaction';

export const useStore = create<Store>(set => ({
	messageMap: {},
	activeUsers: [],
	chatList: [],
	userEmails: [],
	chatVisitorStatus: {},
	errorMessage: '',
	setMessageMap: (updated: MessageMap) => set({ messageMap: updated }),
	setActiveUsers: (updated: string[]) => set({ activeUsers: updated }),
	setUserEmails: (updated: string[]) => set({ userEmails: updated }),
	setChatList: (updated: UserChat[]) => set({ chatList: updated }),
	setChatVisitorStatus: (updated: ChatVisitorStatus) => set({ chatVisitorStatus: updated }),
	setErrorMessage: (text: string) => set({ errorMessage: text }),
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
	updateIsReadMap: (chatId: string) => async (id: string) => {
		sendChangeMessageIsRead({ messageId: id, chatId });
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
	addReactionMap:
		(chatId: string, authorImageUrl: string | null | undefined) => (messageId: string, reaction: string) => {
			sendAddReaction({ chatId, messageId, reaction, authorImageUrl });
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
