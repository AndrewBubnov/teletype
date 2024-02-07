'use client';
import { useCallback, useMemo, useState } from 'react';
import { useChat } from '@/app/chat/[chatId]/hooks/useChat';
import { useSelect } from '@/app/shared/hooks/useSelect';
import { useScrolledTo } from '@/app/chat/[chatId]/hooks/useScrolledTo';
import { FullScreenLoader } from '@/app/shared/components/FullScreenLoader';
import { BackButton } from '@/app/chat/[chatId]/components/BackButton';
import { ChatHeader } from '@/app/chat/[chatId]/components/ChatHeader';
import { SingleMessage } from '@/app/chat/[chatId]/components/SingleMessage';
import { sendEditMessage } from '@/webSocketActions/sendEditMessage';
import { MessageInput } from '@/app/chat/[chatId]/components/MessageInput';
import { UnreadMessages } from '@/app/chat/[chatId]/components/UnreadMessages';
import { deleteOrHideMessages } from '@/prismaActions/deleteOrHideMessages';
import { useDeleteDialog } from '@/app/chat/[chatId]/hooks/useDeleteDialog';
import { ConfirmDialog } from '@/app/chat/[chatId]/components/ConfirmDialog';
import { getUpdateData } from '@/app/chat/[chatId]/utils/getUpdateData';
import { sendDeleteUserChats } from '@/webSocketActions/sendDeleteUserChats';
import { deleteSingleChat } from '@/prismaActions/deleteSingleChat';
import { ChatMenuButton } from '@/app/chat/[chatId]/components/ChatMenuButton';
import { ChatProps, Message, UpdateData, UpdateMessageType } from '@/types';
import styles from '../chatId.module.css';
import { MessageProvider } from '@/app/chat/[chatId]/providers/MessageProvider';

export const Chat = ({ chat }: ChatProps) => {
	const {
		messageList,
		addReaction,
		interlocutorName,
		authorImageUrl,
		interlocutorImageUrl,
		chatId,
		interlocutorId,
		authorName,
		unreadNumber,
		updateIsRead,
		firstUnreadId,
		userId,
	} = useChat(chat);

	const shownMessageList = useMemo(
		() => messageList.filter(el => !el.isHidden?.includes(userId)),
		[messageList, userId]
	);

	const [repliedMessage, setRepliedMessage] = useState<Message | null>(null);
	const [editedMessage, setEditedMessage] = useState<Message | null>(null);

	const { selectedIds, isAllSelected, toggleAllSelected, addSelection, startSelection, dropSelectMode } =
		useSelect(shownMessageList);

	const { dialogOpen, deleteMessageHandler, closeDialogHandler } = useDeleteDialog();

	const scrolledTo = useScrolledTo(unreadNumber);

	const isSelectMode = !!selectedIds.length;

	const onAddReaction = useCallback(
		(message: Message) => async (reactionString: string) => {
			const reaction = message.reaction === reactionString ? '' : reactionString;
			await addReaction(message, reaction, authorImageUrl);
		},
		[addReaction, authorImageUrl]
	);

	const onSelectModeStart = useCallback((id: string) => () => startSelection(id), [startSelection]);

	const onDeleteMessage = useCallback(
		async (informAll: boolean) => {
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

	const onReplyMessage = (message: Message) => () => setRepliedMessage(message);

	const onEditMessage = (message: Message) => () => setEditedMessage(message);

	const scrollToLastHandler = useCallback(() => {
		const id = messageList.at(-1)?.id;
		if (!id) return;
		const node = document.getElementById(id);
		node?.scrollIntoView({ behavior: 'smooth' });
	}, [messageList]);

	const messageContextProps = useMemo(
		() => ({
			replyMessageHandler: onReplyMessage,
			editMessageHandler: onEditMessage,
			addReactionHandler: onAddReaction,
			selectModeStartHandler: onSelectModeStart,
			addSelection,
			isSelectMode,
			firstUnreadId,
		}),
		[addSelection, firstUnreadId, isSelectMode, onAddReaction, onSelectModeStart]
	);

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
				<div className={styles.chatWrapper}>
					<MessageProvider messageContextProps={messageContextProps}>
						{shownMessageList.map((message, index, { length }) => {
							const repliedMessage = message.replyToId
								? messageList.find(el => el.id === message.replyToId)
								: null;
							const isAuthoredByUser = message.authorId === userId;
							return (
								<SingleMessage
									key={message.id}
									message={message}
									isSelected={selectedIds.includes(message.id)}
									isScrolledTo={isAuthoredByUser && index === length - 1 - scrolledTo}
									updateIsRead={!isAuthoredByUser ? updateIsRead : null}
									isAuthoredByUser={isAuthoredByUser}
									repliedMessage={repliedMessage}
								/>
							);
						})}
					</MessageProvider>
				</div>
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
