import { create } from 'zustand';
import { sendAddReaction } from '@/utils/sendAddReaction';
import { updateMessageIsRead } from '@/actions/updateMessageIsRead';
import { addReaction } from '@/actions/addReaction';
import { ChatVisitorStatus, Message, MessageMap, Store, Toast, UpdateMessageType, UserChat } from '@/types';

export const useStore = create<Store>(set => ({
	messageMap: {},
	activeUsers: [],
	chatList: [],
	userEmails: [],
	chatVisitorStatus: {},
	toast: null,
	userId: '',
	setMessageMap: (updated: MessageMap) => set({ messageMap: updated }),
	setActiveUsers: (updated: string[]) => set({ activeUsers: updated }),
	setUserEmails: (updated: string[]) => set({ userEmails: updated }),
	setChatList: (updated: UserChat[]) => set({ chatList: updated }),
	setChatVisitorStatus: (updated: ChatVisitorStatus) => set({ chatVisitorStatus: updated }),
	setToast: (toast: Toast) => set({ toast }),
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
	updateMessageInMessageMap: ({ updateData, type, roomId: chatId }) =>
		set(state => {
			if (type === UpdateMessageType.DELETE) {
				const deletedIds = Object.keys(updateData);
				return {
					messageMap: {
						...state.messageMap,
						[chatId]: state.messageMap[chatId].filter(el => !deletedIds.includes(el.id)),
					},
				};
			}
			return {
				messageMap: {
					...state.messageMap,
					[chatId]: state.messageMap[chatId].map(el => {
						if (updateData[el.id]) return updateData[el.id]!;
						return el;
					}),
				},
			};
		}),
	updateIsReadMap: (chatId: string) => async (id: string) => {
		await updateMessageIsRead(id);
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
		(chatId: string, authorImageUrl: string | null | undefined) => async (messageId: string, reaction: string) => {
			const message = await addReaction({ messageId, reaction, authorImageUrl });
			if (message) sendAddReaction({ chatId, messageId, message });

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
	setUserId: (userId: string) => set({ userId }),
}));
