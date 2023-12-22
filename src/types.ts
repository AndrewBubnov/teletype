import { Dispatch, HTMLAttributes, MutableRefObject, PointerEvent, ReactNode, SetStateAction } from 'react';
import { ImageProps } from 'next/image';
import { ButtonProps } from '@mui/material';

export interface MainProviderProps {
	children: ReactNode;
	userEmails: string[];
	userId: string;
	userChats: UserChat[];
}

export type MessageMap = Record<string, Message[]>;

export interface MessageProviderProps {
	children: ReactNode;
	messageMap: MessageMap;
	updateIsReadMap: (chatId: string) => (id: string) => Promise<void>;
	addReactionMap: (chatId: string, authorImageUrl: string | null) => (id: string, reaction: string) => void;
}

export type MessageContextProps = Omit<MessageProviderProps, 'children'>;

interface MainContext extends MainProviderProps {
	chatList: UserChat[];
}

export interface SocketContextProps {
	activeUsers: string[];
	chatVisitorStatus: ChatVisitorStatus;
}

export type MainContextProps = Omit<MainContext, 'children' | 'userChats' | 'userId'>;

export enum MessageType {
	COMMON = 'COMMON',
	EMOJI = 'EMOJI',
}

export interface ServerMessage {
	id: string;
	date: Date;
	authorId: string;
	authorName: string;
	type: MessageType;
	chatId: string | null;
	chat?: Chat;
	text: string | null;
	imageUrl: string | null;
	reaction: string | null;
	reactionAuthorImageUrl?: string | null;
	replyToId: string | null;
}

export interface Message extends ServerMessage {
	isRead: boolean;
}

export type Chat = {
	id: string;
	chatId: string;
	memberIds: string[];
	messageIds: string[];
};

export interface UserChat extends Chat {
	members: User[];
	messages: Message[];
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
	singlePadding?: boolean;
	withOffset?: boolean;
}

export interface InnerMessageBoxProps extends HTMLAttributes<HTMLDivElement> {
	isAuthoredByUser: boolean;
	withPadding?: boolean;
}

export interface MessageItemBottomProps extends HTMLAttributes<HTMLDivElement> {
	multipleChild: boolean;
	withOffset?: boolean;
}
export interface ElapsedTimeWrapperProps extends HTMLAttributes<HTMLDivElement> {
	color: string;
}

export interface RepliedMessageTextProps extends HTMLAttributes<HTMLDivElement> {
	isMultiple: boolean;
}

export interface ChatProps {
	chat: UserChat;
}

export interface UserPhotoImageProps extends ImageProps {
	isActive?: boolean;
	size?: number;
}

export interface ChatListItemProps {
	chatId: string;
	interlocutor: User;
	onPress(): void;
	onLongPress(): void;
	isDeleteMode: boolean;
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

export type SingleMessageProps = {
	message: Message;
	repliedMessage?: Message | null;
	onContextMenuToggle(type: 'open' | 'close', middle?: DOMRect): void;
	updateIsRead(arg: string): void;
};

export interface AddMessageToChat {
	chatId: string;
	authorId: string;
	authorName: string;
	messageType: MessageType;
	messageText?: string;
	messageImageUrl?: string;
	replyToId?: string;
}

export interface EditMessageClient {
	messageId: string;
	message: Message | null;
	roomId: string;
}
export interface EditMessageServer extends EditMessageClient {
	authorOnly?: boolean;
}

export interface StyledButtonProps extends ButtonProps {
	textColor?: string;
}

export interface ChatListItemInnerWrapperProps extends HTMLAttributes<any> {
	isDeleteMode: boolean;
}

export interface RepliedMessageBoxProps {
	message: Message | null;
	onDropMessage(): void;
	authorName: string;
}
export interface UseLongPress {
	onLongPress: (event: PointerEvent) => void;
	onPress?: (event: PointerEvent) => void;
	delay?: number;
}

export interface ContextMenuProps {
	chatId: string;
	interlocutorName: string;
	menuActiveId: string;
	onAddReaction(arg: string): void;
	closeContextMenu(): void;
	initMenuParams: MutableRefObject<DOMRect | null>;
	onReplyMessage(): void;
	menuTop: number;
}

export interface ChatHeaderProps {
	chatId: string;
	interlocutorId: string;
	interlocutorName: string;
	interlocutorImageUrl?: string | null;
}
export interface MessageProps {
	isAuthoredByUser: boolean;
	onPress(): void;
	message: Message;
	repliedMessage?: Message | null;
	width?: number;
}

export interface ScrollToBottomButtonProps {
	unreadNumber: number;
	onPress(): void;
}

export interface MessageInputProps {
	chatId: string;
	authorName: string;
	repliedMessage: Message | null;
	setRepliedMessage: Dispatch<SetStateAction<Message | null>>;
}

export interface ImageMessageProps {
	message: Message;
	width?: number;
}
