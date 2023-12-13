import { HTMLAttributes, MutableRefObject, ReactNode } from 'react';
import { ImageProps } from 'next/image';

export interface MainProviderProps {
	children: ReactNode;
	userEmails: string[];
	userId: string;
	userChats: UserChat[];
}
interface MainContext extends MainProviderProps {
	chatList: UserChat[];
}

export interface SocketContextProps {
	activeUsers: string[];
	chatVisitorStatus: ChatVisitorStatus;
}

export type MainContextProps = Omit<MainContext, 'children' | 'userChats'>;

export enum MessageType {
	TEXT = 'TEXT',
	IMAGE = 'IMAGE',
	EMOJI = 'EMOJI',
}

export type Message = {
	id: string;
	date: Date;
	authorId: string;
	type: MessageType;
	chatId: string | null;
	chat?: Chat;
	text: string | null;
	imageUrl: string | null;
	reaction: string | null;
	reactionAuthorImageUrl?: string | null;
};

export type Chat = {
	id: string;
	chatId: string;
	memberIds: string[];
	messages: Message[];
};

export interface UserChat extends Chat {
	members: User[];
}

export type User = {
	id: string;
	userId: string;
	email: string;
	username: string;
	chatIds: string[];
	imageUrl: string | null;
};

export interface UserPhotoStubProps extends HTMLAttributes<HTMLDivElement> {
	isActive: boolean;
}

export interface ActiveChatProps {
	params: { chatId: string };
}

export interface MessageBoxProps extends HTMLAttributes<HTMLDivElement> {
	isAuthoredByUser: boolean;
	transparent?: boolean;
}

export interface MessageItemBottomProps extends HTMLAttributes<HTMLDivElement> {
	multipleChild: boolean;
}
export interface ElapsedTimeWrapperProps extends HTMLAttributes<HTMLDivElement> {
	color: string;
}

export interface ChatProps {
	chat: UserChat;
}

export interface UserPhotoImageProps extends ImageProps {
	isActive?: boolean;
	size?: number;
}

export type Mode = 'common' | 'delete';

export interface ChatListItemProps {
	interlocutor: User;
	onClick(): void;
	onLongPress(): void;
	mode: Mode;
	onCheckboxToggle(): void;
	isChecked: boolean;
}

export enum VisitorStatus {
	IN = 'in',
	OUT = 'out',
}

export interface ChangeVisitorStatus {
	status: VisitorStatus;
	userId: string;
	chatId: string;
}

export type ChatVisitorStatus = Record<string, Record<string, { status: VisitorStatus; date: Date }>>;

export interface GetInterlocutorState {
	chatVisitorStatus: ChatVisitorStatus;
	chatId: string;
	interlocutorId: string;
	activeUsers: string[];
}

export interface ChatHeaderProps {
	chatId: string;
	interlocutorId: string;
	interlocutorName: string;
	interlocutorImageUrl?: string | null;
}

export type SingleMessageProps = {
	message: Message;
	onContextMenuToggle(type: 'open' | 'close', middle?: DOMRect): void;
	menuActive: boolean;
	onAddReaction(arg: string): void;
};

export interface AddMessageToChat {
	chatId: string;
	authorId: string;
	messageType: MessageType;
	messageText?: string;
	messageImageUrl?: string;
}

export interface ContextMenuProps {
	onAddReaction(arg: string): void;
	closeContextMenu(): void;
	initMenuParams: MutableRefObject<DOMRect | null>;
	menuTop: number;
	onDeleteMessage(): void;
}

export interface EditMessageClient {
	messageId: string;
	message: Message | null;
}
export interface EditMessageServer extends EditMessageClient {
	roomId: string;
}
