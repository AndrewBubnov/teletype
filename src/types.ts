import {
	ChangeEventHandler,
	CSSProperties,
	Dispatch,
	FC,
	MutableRefObject,
	PointerEventHandler,
	PropsWithChildren,
	ReactElement,
	ReactNode,
	RefObject,
	SetStateAction,
	SyntheticEvent,
} from 'react';

export type UnreadMessageMap = Record<string, { lastMessage: Message | null; unreadNumber: number }>;

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
	isFirstDateMessage?: true;
}

export type MessageDraft = Omit<Message, 'id' | 'createdAt' | 'hidden'>;

export type Chat = {
	id: string;
	chatId: string;
	memberIds: string[];
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

export interface ActiveChatProps {
	params: { chatId: string };
}

export interface ChatProps {
	chat: UserChat;
}

export interface ChatListItemProps {
	chatId: string;
	interlocutor: User;
	onPress(): void;
	onLongPress(): void;
	isSelectMode: boolean;
	isChecked: boolean;
	isActiveChat: boolean;
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
	onSelectModeStart(evt: SyntheticEvent): void;
	firstUnreadId: string | null;
};

export interface RepliedMessageBoxProps {
	message: Message;
	onDropMessage(): void;
	authorName: string;
}
export interface UseLongPress {
	onLongPress: PointerEventHandler;
	onPress?: PointerEventHandler;
	delay?: number;
}

export interface ContextMenuProps {
	onAddReaction(arg: string): void;
	onCloseMenu(): void;
	messageParams: MutableRefObject<DOMRect | null>;
	containerRef: RefObject<HTMLDivElement>;
	onReplyMessage(): void;
	onEditMessage(): void;
	onDownLoadImage: null | (() => void);
	isAuthor: boolean;
}
export interface EmojiMessageProps {
	isAuthoredByUser: boolean;
	message: Message;
	isSelectMode: boolean;
	xOffset: string;
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
	interlocutorId: string;
}

export interface ImageMessageProps {
	message: Message;
	isEnlarged: boolean;
}

export enum UpdateMessageType {
	EDIT = 'edit',
	DELETE = 'delete',
}

export type UpdateMessage = {
	updateData: Array<Message>;
	type: UpdateMessageType;
	roomId: string;
};

export interface UnreadMessagesStore {
	messageMap: UnreadMessageMap;
	setMessageMap(arg: UnreadMessageMap): void;
	addMessageToMessageMap(arg: Message): void;
	updateUnreadMessages(arg: UpdateMessage): void;
	updateIsReadInStore(arg: UpdateIsRead): void;
}

export interface DraftMessageStore {
	draftMap: Record<string, string>;
	addDraft(draft: string, chatId: string): void;
	removeDraft(chatId: string): void;
}
export interface StatusStore {
	activeUsers: string[];
	chatVisitorStatus: ChatVisitorStatus;
	setActiveUsers(arg: string[]): void;
	setChatVisitorStatus(arg: ChatVisitorStatus): void;
}

export interface CommonStore {
	chatList: UserChat[];
	userEmails: string[];
	errorToastText: string;
	userId: string;
	setUserEmails(arg: string[]): void;
	setChatList(arg: UserChat[]): void;
	setErrorToastText(arg: string): void;
	setUserId(arg: string): void;
}

export interface ActiveChatStore {
	isActiveChatLoading: boolean;
	activeChat: UserChat | null;
	setActiveChat(arg: string): void;
}

export interface IsWideModeStore {
	isWideMode: boolean;
	setIsWideMode(arg: boolean): void;
}

export interface LeftSideWidthStore {
	leftSideWidth: number;
	setLeftSideWidth(arg: number): void;
}

export type Subscription<T> = (fn: (arg: T) => void) => void;

export interface ImagePreviewModalProps {
	open: boolean;
	onClose(): void;
	src: string | null;
	width: number;
}
export interface TextAreaEndDecoratorProps {
	onSelectFile: ChangeEventHandler<HTMLInputElement>;
	messageImageUrl: string | null;
	openPreviewModal(): void;
	onDropImageUrl(): void;
	onCameraStart(): void;
	onSubmit(): Promise<void>;
}

export interface ToastProps {
	onClose(): void;
	text: string;
}

export interface CameraModeProps {
	isOpen: boolean;
	onClose(evt?: {}, reason?: 'backdropClick' | 'escapeKeyDown'): void;
	onTakePhoto(arg: string): void;
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
	unreadMessageMap: UnreadMessageMap;
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
	isAllSelected: boolean;
	toggleAllSelected(): void;
	onDelete: (() => Promise<void>) | ((evt: SyntheticEvent) => void);
	withPadding?: boolean;
	className?: string;
}

export interface StyledElementProps extends PropsWithChildren {
	element: string | FC;
	className: string;
	styles: { readonly [key: string]: string };
	attributes?: Record<string, boolean | string>;
	style?: CSSProperties;
}

export interface TextAreaProps {
	minRows: number;
	maxRows: number;
	startDecorator: ReactElement;
	endDecorator: ReactElement;
	value: string;
	onChange: ChangeEventHandler<HTMLTextAreaElement>;
}

export interface DialogProps extends PropsWithChildren {
	children: ReactNode;
	isOpen: boolean;
	onClose(): void;
	className?: string;
	style?: CSSProperties;
}

export interface StyledCheckboxProps {
	id: string;
	checked: boolean;
	onChange?: ChangeEventHandler<HTMLInputElement>;
	label?: string;
	className?: string;
}

export interface BackButtonProps {
	interlocutorName: string;
	interlocutorImageUrl?: string | null;
}

export interface ChatMenuButtonProps {
	onClearChatHistory(): void;
	onDeleteChat(): void;
}

export interface ChatMenuProps extends ChatMenuButtonProps {
	onClose(): void;
}

export interface ChatHeaderProps {
	chatId: string;
	interlocutorId: string;
	isSelectMode: boolean;
	dropSelectMode(): void;
	onDelete: (() => Promise<void>) | ((evt: SyntheticEvent) => void);
	selectedNumber: number;
	isAllSelected: boolean;
	toggleAllSelected(): void;
}

export interface StyledElementClone {
	className: string;
	style: CSSProperties;
}

export interface FadeProps {
	children: ReactElement;
	isShown: boolean;
	className?: string;
}

export interface FadeContextProps {
	onTransitionEnd(): void;
}

export interface FadeProviderProps extends FadeContextProps {
	children: ReactNode;
}

export type AspectRatioAndWidth = { width: number; aspectRatio: number };

export interface UpdateIsRead {
	roomId: string;
	messageId: string;
}
export interface FlippedProps {
	children: ReactNode;
	className?: string;
}
