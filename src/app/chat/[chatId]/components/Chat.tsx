'use client';
import { useCallback, useMemo, useState } from 'react';
import { useChat } from '@/app/chat/[chatId]/hooks/useChat';
import { useSelect } from '@/app/shared/hooks/useSelect';
import { useMenuTransition } from '@/app/chat/[chatId]/hooks/useMenuTransition';
import { useScrolledTo } from '@/app/chat/[chatId]/hooks/useScrolledTo';
import { FullScreenLoader } from '@/app/shared/components/FullScreenLoader';
import { BackButton } from '@/app/chat/[chatId]/components/BackButton';
import { ChatHeader } from '@/app/chat/[chatId]/components/ChatHeader';
import { SingleMessage } from '@/app/chat/[chatId]/components/SingleMessage';
import { sendEditMessage } from '@/webSocketActions/sendEditMessage';
import { ContextMenu } from '@/app/chat/[chatId]/components/ContextMenu';
import { MessageInput } from '@/app/chat/[chatId]/components/MessageInput';
import { UnreadMessages } from '@/app/chat/[chatId]/components/UnreadMessages';
import { deleteOrHideMessages } from '@/prismaActions/deleteOrHideMessages';
import { useDeleteDialog } from '@/app/chat/[chatId]/hooks/useDeleteDialog';
import { ConfirmDialog } from '@/app/chat/[chatId]/components/ConfirmDialog';
import { getUpdateData } from '@/app/chat/[chatId]/utils/getUpdateData';
import { sendDeleteUserChats } from '@/webSocketActions/sendDeleteUserChats';
import { deleteSingleChat } from '@/prismaActions/deleteSingleChat';
import { ChatProps, Message, MessageType, UpdateData, UpdateMessageType } from '@/types';
import styles from '../chatId.module.css';
import { ChatMenuButton } from '@/app/chat/[chatId]/components/ChatMenuButton';

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
		userId,
	} = useChat(chat);

	const shownMessageList = useMemo(
		() => messageList.filter(el => !el.isHidden?.includes(userId)),
		[messageList, userId]
	);

	const [repliedMessage, setRepliedMessage] = useState<Message | null>(null);
	const [editedMessage, setEditedMessage] = useState<Message | null>(null);
	const [menuActiveId, setMenuActiveId] = useState<string>('');

	const { menuTop, setMessageParams, containerRef, initMenuParams } = useMenuTransition(menuActiveId, userId);

	const { selectedIds, isAllSelected, toggleAllSelected, addSelection, startSelection, dropSelectMode } =
		useSelect(shownMessageList);

	const { dialogOpen, deleteMessageHandler, closeDialogHandler } = useDeleteDialog();

	const scrolledTo = useScrolledTo(unreadNumber);

	const isSelectMode = !!selectedIds.length;

	const contextMenuToggleHandler = (id: string) => (type: 'open' | 'close', messageParams: DOMRect) => {
		if (isSelectMode) {
			addSelection(id);
			return;
		}
		setMessageParams(messageParams);
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
			const ids = isSelectMode ? selectedIds : [menuActiveId];
			const type = informAll ? UpdateMessageType.DELETE : UpdateMessageType.EDIT;
			const hideToId = type === UpdateMessageType.EDIT ? userId : null;
			const updated = await deleteOrHideMessages(ids, type, hideToId);
			const updateData = getUpdateData({ updated, informAll, selectedIds, menuActiveId, isSelectMode });
			sendEditMessage({
				updateData,
				type: informAll ? UpdateMessageType.DELETE : UpdateMessageType.EDIT,
				roomId: chatId,
			});
			dropSelectMode();
		},
		[chatId, dropSelectMode, isSelectMode, menuActiveId, selectedIds, userId]
	);

	const onClearChatHistory = useCallback(async () => {
		const messageIds = messageList.map(el => el.id);
		await deleteOrHideMessages(messageIds, UpdateMessageType.DELETE, null);
		const updateData = messageIds.reduce(
			(acc, cur) => ({
				...acc,
				[cur]: null,
			}),
			{} as UpdateData
		);
		sendEditMessage({
			updateData,
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
		if (!activeMessage) return;
		if (activeMessage.imageUrl) {
			const link = document.createElement('a');
			link.download = 'image.jpg';
			link.href = activeMessage.imageUrl;
			link.click();
		}
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
		<div className={styles.chatContainer}>
			<BackButton interlocutorName={interlocutorName} interlocutorImageUrl={interlocutorImageUrl} />
			<div className={styles.chatHeaderContainer}>
				<ChatHeader
					chatId={chatId}
					interlocutorId={interlocutorId}
					isSelectMode={isSelectMode}
					dropSelectMode={dropSelectMode}
					selectedNumber={selectedIds.length}
					onDelete={deleteMessageHandler}
					isAllSelected={isAllSelected}
					toggleAllSelected={toggleAllSelected}
				/>
				{!isSelectMode && (
					<ChatMenuButton onDeleteChat={onDeleteChat} onClearChatHistory={onClearChatHistory} />
				)}
			</div>
			<div className={styles.coverWrapper}>
				<div className={styles.chatWrapper} ref={containerRef}>
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
								isScrolledTo={isAuthoredByUser && index === length - 1 - scrolledTo}
								onContextMenuToggle={contextMenuToggleHandler(message.id)}
								updateIsRead={message.authorId !== userId ? updateIsRead : null}
								isAuthoredByUser={isAuthoredByUser}
								onSelectModeStart={onSelectModeStart(message.id)}
							/>
						);
					})}
				</div>
				{!!activeMessage && (
					<ContextMenu
						menuTop={menuTop}
						onEditMessage={onEditMessage}
						onCloseMenu={closeMenuHandler}
						initMenuParams={initMenuParams}
						onReplyMessage={onReplyMessage}
						onAddReaction={addReactionHandler}
						onDeleteMessage={deleteMessageHandler}
						canReply={activeMessage.type === MessageType.COMMON}
						isAuthor={activeMessage.authorId === authorId}
						onDownLoadImage={activeMessage.imageUrl ? onDownLoadImage : null}
					/>
				)}
				{unreadNumber ? <UnreadMessages unreadNumber={unreadNumber} onPress={scrollToLastHandler} /> : null}
			</div>
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
		</div>
	);
};
