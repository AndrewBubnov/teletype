'use client';
import { useCallback, useMemo, useState } from 'react';
import { useChat } from '@/app/chat-list/[chatId]/hooks/useChat';
import { useSelect } from '@/app/shared/hooks/useSelect';
import { useMenuTransition } from '@/app/chat-list/[chatId]/hooks/useMenuTransition';
import { FullScreenLoader } from '@/app/shared/components/FullScreenLoader';
import { BackButton } from '@/app/chat-list/[chatId]/components/BackButton/BackButton';
import { ChatHeader } from '@/app/chat-list/[chatId]/components/ChatHeader/ChatHeader';
import { SingleMessage } from '@/app/chat-list/[chatId]/components/SingleMessage/SingleMessage';
import { sendEditMessage } from '@/webSocketActions/sendEditMessage';
import { ContextMenu } from '@/app/chat-list/[chatId]/components/ContextMenu/ContextMenu';
import { MessageInput } from '@/app/chat-list/[chatId]/components/MessageInput/MessageInput';
import { UnreadMessagesButton } from '@/app/chat-list/[chatId]/components/UnreadMessagesButton/UnreadMessagesButton';
import { deleteOrHideMessages } from '@/prismaActions/deleteOrHideMessages';
import { useDeleteDialog } from '@/app/chat-list/[chatId]/hooks/useDeleteDialog';
import { ConfirmDialog } from '@/app/chat-list/[chatId]/components/ConfirmDialog/ConfirmDialog';
import { RightSideResizable } from '@/app/chat-list/[chatId]/components/RightSideResizable/RightSideResizable';
import { sendDeleteUserChats } from '@/webSocketActions/sendDeleteUserChats';
import { deleteSingleChat } from '@/prismaActions/deleteSingleChat';
import { ChatMenuButton } from '@/app/chat-list/[chatId]/components/ChatMenuButton/ChatMenuButton';
import { downloadImage } from '@/app/chat-list/[chatId]/utils/downloadImage';
import { ChatProps, Message, UpdateMessageType } from '@/types';
import styles from './ChatId.module.css';

export const Chat = ({ chat }: ChatProps) => {
	const {
		messageList,
		addReaction,
		interlocutorName,
		authorImageUrl,
		interlocutorImageUrl,
		chatId,
		authorId,
		interlocutorId,
		authorName,
		unreadNumber,
		updateIsRead,
		firstUnreadId,
		isActiveChatLoading,
		userId,
	} = useChat(chat);

	const shownMessageList = useMemo(() => messageList.filter(el => el.isHidden !== userId), [messageList, userId]);

	const [repliedMessage, setRepliedMessage] = useState<Message | null>(null);
	const [editedMessage, setEditedMessage] = useState<Message | null>(null);
	const [menuActiveId, setMenuActiveId] = useState<string>('');

	const { menuTop, messageParams, initMenuParams } = useMenuTransition();

	const { selectedIds, isAllSelected, toggleAllSelected, addSelection, startSelection, dropSelectMode } =
		useSelect(shownMessageList);

	const { dialogOpen, deleteMessageHandler, closeDialogHandler } = useDeleteDialog();

	const isSelectMode = !!selectedIds.length;

	const contextMenuToggleHandler = (id: string) => (type: 'open' | 'close', params: DOMRect) => {
		if (isSelectMode) {
			addSelection(id);
			return;
		}
		if (editedMessage || repliedMessage) return;
		messageParams.current = params;
		setMenuActiveId(type === 'open' ? id : '');
	};

	const closeMenuHandler = useCallback(() => setMenuActiveId(''), []);

	const activeMessage = useMemo(() => messageList.find(el => el.id === menuActiveId), [menuActiveId, messageList]);

	const addReactionHandler = useCallback(
		async (reactionString: string) => {
			if (!activeMessage) return;
			const reaction = activeMessage.reaction === reactionString ? '' : reactionString;
			await addReaction(activeMessage, reaction, authorImageUrl);
			setMenuActiveId('');
		},
		[activeMessage, addReaction, authorImageUrl]
	);

	const onSelectModeStart = (id: string) => () => {
		startSelection(id);
		setMenuActiveId('');
	};

	const onDeleteMessage = useCallback(
		async (informAll: boolean) => {
			setMenuActiveId('');
			const type = informAll ? UpdateMessageType.DELETE : UpdateMessageType.EDIT;
			const hideToId = informAll ? null : userId;
			const updated = await deleteOrHideMessages(selectedIds, type, hideToId);
			sendEditMessage({ updateData: updated, type, roomId: chatId });
			dropSelectMode();
		},
		[chatId, dropSelectMode, selectedIds, userId]
	);

	const onClearChatHistory = useCallback(async () => {
		const messageIds = messageList.map(el => el.id);
		await deleteOrHideMessages(messageIds, UpdateMessageType.DELETE, null);
		sendEditMessage({
			updateData: messageList,
			type: UpdateMessageType.DELETE,
			roomId: chatId,
		});
	}, [chatId, messageList]);

	const onDeleteChat = useCallback(async () => {
		await deleteSingleChat(chatId);
		sendDeleteUserChats([chat.id]);
	}, [chat.id, chatId]);

	const onReplyMessage = useCallback(() => {
		if (activeMessage) setRepliedMessage(activeMessage);
		setMenuActiveId('');
	}, [activeMessage]);

	const onEditMessage = useCallback(() => {
		if (activeMessage) setEditedMessage(activeMessage);
		setMenuActiveId('');
	}, [activeMessage]);

	const onDownLoadImage = useCallback(() => {
		downloadImage(activeMessage);
		setMenuActiveId('');
	}, [activeMessage]);

	const scrollToLastHandler = useCallback(() => {
		const id = messageList.at(-1)?.id;
		if (!id) return;
		const node = document.getElementById(id);
		node?.scrollIntoView({ behavior: 'smooth' });
	}, [messageList]);

	if (!userId) return <FullScreenLoader />;

	return (
		<RightSideResizable>
			<BackButton interlocutorName={interlocutorName} interlocutorImageUrl={interlocutorImageUrl} />
			<div className={styles.chatHeaderContainer}>
				<ChatHeader
					chatId={chatId}
					interlocutorId={interlocutorId}
					isSelectMode={isSelectMode}
					onDelete={deleteMessageHandler}
					dropSelectMode={dropSelectMode}
					selectedNumber={selectedIds.length}
					isAllSelected={isAllSelected}
					toggleAllSelected={toggleAllSelected}
				/>
				{!isSelectMode && (
					<ChatMenuButton onDeleteChat={onDeleteChat} onClearChatHistory={onClearChatHistory} />
				)}
			</div>
			{isActiveChatLoading ? (
				<FullScreenLoader />
			) : (
				<div className={styles.chatWrapper}>
					{shownMessageList.map((message, index, { length }) => {
						const repliedMessage = message.replyToId
							? messageList.find(el => el.id === message.replyToId)
							: null;
						const isAuthoredByUser = message.authorId === userId;
						return (
							<SingleMessage
								key={message.id}
								message={message}
								isSelectMode={isSelectMode}
								repliedMessage={repliedMessage}
								isSelected={selectedIds.includes(message.id)}
								isScrolledTo={firstUnreadId ? firstUnreadId === message.id : index === length - 1}
								onContextMenuToggle={contextMenuToggleHandler(message.id)}
								updateIsRead={message.authorId !== userId ? updateIsRead : null}
								isAuthoredByUser={isAuthoredByUser}
								firstUnreadId={firstUnreadId}
								onSelectModeStart={onSelectModeStart(message.id)}
							/>
						);
					})}
				</div>
			)}
			{!!activeMessage && (
				<ContextMenu
					menuTop={menuTop}
					onEditMessage={onEditMessage}
					onCloseMenu={closeMenuHandler}
					initMenuParams={initMenuParams}
					onReplyMessage={onReplyMessage}
					onAddReaction={addReactionHandler}
					isAuthor={activeMessage.authorId === authorId}
					onDownLoadImage={activeMessage.imageUrl ? onDownLoadImage : null}
				/>
			)}
			{unreadNumber ? <UnreadMessagesButton unreadNumber={unreadNumber} onPress={scrollToLastHandler} /> : null}
			<MessageInput
				chatId={chatId}
				authorName={authorName}
				repliedMessage={repliedMessage}
				setRepliedMessage={setRepliedMessage}
				editedMessage={editedMessage}
				setEditedMessage={setEditedMessage}
				interlocutorId={interlocutorId}
			/>
			<ConfirmDialog
				open={dialogOpen}
				isMultiple={selectedIds.length > 1}
				onCancel={closeDialogHandler}
				onConfirm={onDeleteMessage}
				interlocutorName={interlocutorName}
			/>
		</RightSideResizable>
	);
};
