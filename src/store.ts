import { create } from 'zustand';
import { updateMessageIsRead } from '@/prismaActions/updateMessageIsRead';
import { addReaction } from '@/prismaActions/addReaction';
import { sendEditMessage } from '@/webSocketActions/sendEditMessage';
import { withErrorNotification } from '@/app/shared/utils/withErrorNotification';
import {
	ChatVisitorStatus,
	CommonStore,
	Message,
	MessageMap,
	MessageStore,
	StatusStore,
	UpdateMessageType,
	UserChat,
} from '@/types';

export const useMessageStore = create<MessageStore>(set => ({
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
	updateIsRead: async (message: Message) => {
		const { id, chatId } = message;
		const updated = await withErrorNotification(updateMessageIsRead, id);
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
		const updated = await withErrorNotification(addReaction, { messageId, reaction, authorImageUrl });
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
