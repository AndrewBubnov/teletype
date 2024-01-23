import {
	ChangeEvent,
	Dispatch,
	FC,
	HTMLAttributes,
	MutableRefObject,
	PointerEvent,
	ReactElement,
	ReactNode,
	SetStateAction,
	SyntheticEvent,
} from 'react';
import { ImageProps } from 'next/image';
import { BoxProps, ButtonProps } from '@mui/material';

export type MessageMap = Record<string, Message[]>;

export enum MessageType {
	COMMON = 'COMMON',
	EMOJI = 'EMOJI',
}

export interface Message {
	id: string;
	createdAt: Date;
	authorId: string;
	authorName: string;
	type: MessageType;
	chatId: string;
	isRead: boolean;
	isHidden?: string;
	text?: string;
	imageUrl?: string | null;
	reaction?: string;
	reactionAuthorImageUrl?: string | null;
	replyToId?: string;
}

export type MessageDraft = Omit<Message, 'id' | 'createdAt' | 'hidden'>;

export type Chat = {
	id: string;
	chatId: string;
	memberIds: string[];
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

export interface ActiveChatProps {
	params: { chatId: string };
}

export interface MessageBoxProps extends HTMLAttributes<HTMLDivElement> {
	isAuthoredByUser: boolean;
	fullWidth?: boolean;
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
export interface ElapsedTimeWrapperProps extends HTMLAttributes<HTMLParagraphElement> {
	color: string;
}

export interface RepliedMessageTextProps extends HTMLAttributes<HTMLDivElement> {
	isMultiple: boolean;
}

export interface ChatProps {
	chat: UserChat;
}

export interface UserPhotoImageProps extends ImageProps {
	size?: number;
}

export interface ChatListItemProps {
	chatId: string;
	interlocutor: User;
	onPress(): void;
	onLongPress(): void;
	isSelectMode: boolean;
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
	updateIsRead: ((arg: Message) => void) | null;
	isScrolledTo: boolean;
	isAuthoredByUser: boolean;
	isSelected: boolean;
	isSelectMode: boolean;
};

export interface StyledButtonProps extends ButtonProps {
	textColor?: string;
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
	onAddReaction(arg: string): void;
	onCloseMenu(): void;
	initMenuParams: MutableRefObject<DOMRect | null>;
	onReplyMessage(): void;
	onEditMessage(): void;
	onSelect(): void;
	onDeleteMessage(evt: SyntheticEvent): void;
	onDownLoadImage: null | (() => void);
	menuTop: number;
	isAuthor: boolean;
}

export interface ChatHeaderProps {
	chatId: string;
	interlocutorId: string;
	interlocutorName: string;
	interlocutorImageUrl?: string | null;
}
export interface MessageProps {
	isAuthoredByUser: boolean;
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
	editedMessage: Message | null;
	setEditedMessage: Dispatch<SetStateAction<Message | null>>;
}

export interface ImageMessageProps {
	message: Message;
	isEnlarged: boolean;
	onEnlargeToggle(evt: SyntheticEvent): void;
	width?: number;
}

type ToastSeverityType = 'error' | 'warning' | 'info' | 'success';

export type Toast = { text: string; type: ToastSeverityType } | null;

export type UpdateData = Record<string, Message | null>;

export enum UpdateMessageType {
	EDIT = 'edit',
	DELETE = 'delete',
}

export type UpdateMessage = {
	updateData: Record<string, Message | null>;
	type: UpdateMessageType;
	roomId: string;
};

export interface MessageStore {
	messageMap: MessageMap;
	setMessageMap(arg: MessageMap): void;
	addMessageToMessageMap(arg: Message): void;
	updateMessageInMessageMap(args: UpdateMessage): void;
	updateIsRead(message: Message): Promise<void>;
	addReaction(message: Message, reaction: string, authorImageUrl: string | null | undefined): Promise<void>;
}
export interface CommonStore {
	chatList: UserChat[];
	activeUsers: string[];
	userEmails: string[];
	toast: Toast;
	userId: string;
	setActiveUsers(arg: string[]): void;
	setUserEmails(arg: string[]): void;
	setChatList(arg: UserChat[]): void;
	setToast(arg: Toast): void;
	chatVisitorStatus: ChatVisitorStatus;
	setChatVisitorStatus(arg: ChatVisitorStatus): void;
	setUserId(arg: string): void;
}

export type Subscription<T> = (fn: (arg: T) => void) => void;

export interface ImagePreviewModalProps {
	open: boolean;
	onClose(): void;
	src: string | null;
	width: number;
}
export interface TextAreaEndDecoratorProps {
	onSelectFile(event: ChangeEvent<HTMLInputElement>): void;
	messageImageUrl: string | null;
	openPreviewModal(): void;
	onDropImageUrl(): void;
	onCameraStart(): void;
	onSubmit(): Promise<void>;
}

export interface ErrorToastProps {
	open: boolean;
	onClose(): void;
	context: Toast;
}

export interface CameraModeProps {
	isOpen: boolean;
	onClose(evt?: {}, reason?: 'backdropClick' | 'escapeKeyDown'): void;
	onTakePhoto(arg: string): void;
}

export interface VideoWrapperProps extends BoxProps {
	isStreaming: boolean;
}

export interface ConfirmDialogProps {
	open: boolean;
	onCancel(): void;
	onConfirm: (arg: boolean) => void;
	interlocutorName: string;
	isMultiple: boolean;
}

export enum FacingMode {
	USER = 'user',
	ENVIRONMENT = 'environment',
}

export interface SubscriberProps {
	userChats: UserChat[];
	userEmails: string[];
	userId: string;
	messageMap: Record<string, Message[]>;
}

export interface CreateMessage {
	chatId: string;
	authorId: string;
	authorName: string;
	type: MessageType;
	text?: string;
	imageUrl?: string | null;
	replyToId?: string;
}

export interface AddReaction {
	messageId: string;
	reaction: string;
	authorImageUrl?: string | null;
}

export interface SelectModeHeaderProps {
	dropSelectMode(): void;
	selectedNumber: number;
	onDelete: (() => Promise<void>) | ((evt: SyntheticEvent) => void);
	isAllSelected: boolean;
	toggleAllSelected(): void;
}

export interface StyledElementProps extends HTMLAttributes<HTMLElement> {
	element: string | FC;
	className: string;
	styles: { readonly [key: string]: string };
	attributes?: Record<string, boolean | string>;
	children: ReactNode;
}

export interface TextAreaProps {
	minRows: number;
	maxRows: number;
	startDecorator: ReactElement;
	endDecorator: ReactElement;
	value: string;
	onChange(evt: ChangeEvent<HTMLTextAreaElement>): void;
}
