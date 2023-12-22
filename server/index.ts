import { Server } from 'socket.io';
import { mergeUnique } from './utils/mergeUnique';
import { PORT } from './constants';
import { Message, ChangeVisitorStatus, ChatVisitorStatus, UserChat, EditMessageServer } from '../src/types';
import { getUniqueUserChatsArray } from './utils/getUniqueUserChatsArray';

const cors = require('cors');
const http = require('http');
const express = require('express');

const app = express();

app.use(cors);
const server = http.createServer(app);

const io = new Server(server, { cors: { origin: '*' } });

const socketIdToUserIdMap: Record<string, string> = {};
const userIdToSocketIdMap: Record<string, string> = {};
const socketUserChatsMap: Record<string, UserChat[]> = {};
let chatVisitorStatus: ChatVisitorStatus = {};

io.on('connection', socket => {
	socket.on('join', userId => {
		const socketId = String(socket.id);
		socketIdToUserIdMap[socketId] = userId;
		userIdToSocketIdMap[userId] = socketId;
		if (!socketUserChatsMap[socketId]) socketUserChatsMap[socketId] = [];
		io.emit('active-users', Object.values(socketIdToUserIdMap));
	});
	socket.on('create-room', ({ roomId, interlocutorId }: { roomId: string; interlocutorId: string }) => {
		socket.join(roomId);
		const secondUserSocketId = userIdToSocketIdMap[interlocutorId];
		const secondUserSocket = io.sockets.sockets.get(secondUserSocketId);
		secondUserSocket?.join(roomId);
	});
	socket.on('init-user-chats', (chats: UserChat[]) => {
		const socketId = String(socket.id);
		const socketUserChatsMapValue = socketUserChatsMap[socketId];
		if (!socketUserChatsMapValue) return;
		socketUserChatsMap[socketId] = getUniqueUserChatsArray(socketUserChatsMapValue, chats);
	});
	socket.on('add-user-chat', (chat: UserChat) => {
		const socketId = String(socket.id);
		const socketUserChatsMapValue = socketUserChatsMap[socketId];
		if (!socketUserChatsMapValue) return;
		socketUserChatsMap[socketId] = mergeUnique(socketUserChatsMapValue, chat);
		const userId = socketIdToUserIdMap[socketId];
		const [connectedUserId] = chat.memberIds.filter(id => id !== userId);
		const connectedSocketId = userIdToSocketIdMap[connectedUserId];
		const socketConnectedUserChatsMapValue = socketUserChatsMap[socketId];
		socketUserChatsMap[connectedSocketId] = mergeUnique(socketConnectedUserChatsMapValue, chat);
		io.to(socketId).emit('update-chat-list', socketUserChatsMap[socketId]);
		io.to(connectedSocketId).emit('update-chat-list', socketUserChatsMap[connectedSocketId]);
	});
	socket.on('delete-user-chats', (chatIds: string[]) => {
		const sockets = Object.keys(socketUserChatsMap).filter(el =>
			socketUserChatsMap[el].some(chat => chatIds.includes(chat.chatId))
		);
		sockets.forEach(el => {
			socketUserChatsMap[el] = socketUserChatsMap[el].filter(chat => !chatIds.includes(chat.chatId));
			io.to(el).emit('update-chat-list', socketUserChatsMap[el]);
		});
	});
	socket.on('message-to-server', ({ message, roomId }: { message: Message; roomId: string }) =>
		io.to(roomId).emit('message-to-client', message)
	);
	socket.on('edit-message-to-server', ({ messageId, message, roomId, authorOnly }: EditMessageServer) => {
		if (authorOnly) {
			return socket.emit('edit-message-to-client', { messageId, message, roomId });
		}
		return io.to(roomId).emit('edit-message-to-client', { messageId, message, roomId });
	});
	socket.on('change-visitor-status-server', ({ status, userId, chatId }: ChangeVisitorStatus) => {
		chatVisitorStatus = {
			...chatVisitorStatus,
			[chatId]: {
				...chatVisitorStatus[chatId],
				[userId]: {
					status,
					date: new Date(),
				},
			},
		};
		return io.emit('change-visitor-status-client', chatVisitorStatus);
	});
	socket.on('disconnect', () => {
		delete socketIdToUserIdMap[socket.id];
		io.emit('active-users', Object.values(socketIdToUserIdMap));
	});
});

server.listen(PORT, () => {
	console.log(`Server is listening on *:${PORT}`);
});
