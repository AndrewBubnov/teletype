'use client';
import { useCallback, useMemo, useState } from 'react';
import { clsx } from 'clsx';
import { useChat } from '@/app/chat-list/[chatId]/hooks/useChat';
import { useSelect } from '@/app/shared/hooks/useSelect';
import { useMenuTransition } from '@/app/chat-list/[chatId]/hooks/useMenuTransition';
import { useScrolledTo } from '@/app/chat-list/[chatId]/hooks/useScrolledTo';
import { FullScreenLoader } from '@/app/shared/components/FullScreenLoader';
import { BackButton } from '@/app/chat-list/[chatId]/components/BackButton';
import { ChatHeader } from '@/app/chat-list/[chatId]/components/ChatHeader';
import { SingleMessage } from '@/app/chat-list/[chatId]/components/SingleMessage';
import { sendEditMessage } from '@/webSocketActions/sendEditMessage';
import { ContextMenu } from '@/app/chat-list/[chatId]/components/ContextMenu';
import { MessageInput } from '@/app/chat-list/[chatId]/components/MessageInput';
import { UnreadMessages } from '@/app/chat-list/[chatId]/components/UnreadMessages';
import { deleteOrHideMessages } from '@/prismaActions/deleteOrHideMessages';
import { useDeleteDialog } from '@/app/chat-list/[chatId]/hooks/useDeleteDialog';
import { ConfirmDialog } from '@/app/chat-list/[chatId]/components/ConfirmDialog';
import { AiOutlineDelete as DeleteIcon } from 'react-icons/ai';
import { getUpdateData } from '@/app/chat-list/[chatId]/utils/getUpdateData';
import { sendDeleteUserChats } from '@/webSocketActions/sendDeleteUserChats';
import { deleteSingleChat } from '@/prismaActions/deleteSingleChat';
import { ChatMenuButton } from '@/app/chat-list/[chatId]/components/ChatMenuButton';
import { downloadImage } from '@/app/chat-list/[chatId]/utils/downloadImage';
import { ChatProps, Message, UpdateData, UpdateMessageType } from '@/types';
import styles from '../chatId.module.css';

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
		userId,
		isWideMode,
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
			const type = informAll ? UpdateMessageType.DELETE : UpdateMessageType.EDIT;
			const hideToId = type === UpdateMessageType.EDIT ? userId : null;
			const updated = await deleteOrHideMessages(selectedIds, type, hideToId);
			const updateData = getUpdateData({ updated, informAll, selectedIds });
			sendEditMessage({ updateData, type, roomId: chatId });
			dropSelectMode();
		},
		[chatId, dropSelectMode, selectedIds, userId]
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
		<div
			className={clsx(styles.chatContainer, {
				[styles.inWideMode]: isWideMode,
				[styles.notInWideMode]: !isWideMode,
			})}
		>
			<BackButton interlocutorName={interlocutorName} interlocutorImageUrl={interlocutorImageUrl} />
			<div className={styles.chatHeaderContainer}>
				<ChatHeader
					chatId={chatId}
					interlocutorId={interlocutorId}
					isSelectMode={isSelectMode}
					dropSelectMode={dropSelectMode}
					selectedNumber={selectedIds.length}
					isAllSelected={isAllSelected}
					toggleAllSelected={toggleAllSelected}
				/>
				{isSelectMode ? (
					<button className={styles.iconButton} onClick={deleteMessageHandler}>
						<DeleteIcon />
					</button>
				) : (
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
								firstUnreadId={firstUnreadId}
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
