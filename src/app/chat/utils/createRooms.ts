import { createRoom } from '@/utils/createRoom';
import { Chat } from '@/types';

export const createRooms = (userChats: Chat[], userId: string) =>
	userChats
		.map(chat => ({
			roomId: chat.chatId,
			interlocutorId: chat.memberIds.find(id => id !== userId) || '',
		}))
		.forEach(({ roomId, interlocutorId }) => createRoom(roomId, interlocutorId));
