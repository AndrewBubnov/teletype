import { useMemo } from 'react';
import { useStore } from '@/store';
import { useLongPress } from '@/app/chat/[chatId]/hooks/useLongPress';
import {
	ChatUnreadMessages,
	ChatListItemMessageText,
	UserPhotoImage,
	UserPhotoStub,
	UserWrapper,
	ChatListItemUsername,
	UserNameWrapper,
	ChatListItemInnerWrapper,
	ChatListItemDateWrapper,
	Italic,
	StyledLabel,
} from '@/app/chat/styled';
import { options } from '@/app/chat/[chatId]/constants';
import { ChatListItemProps } from '@/types';
import { StyledCheckbox } from '@/app/shared/styled';

export const ChatListItem = ({
	chatId,
	interlocutor,
	onPress,
	onLongPress,
	isSelectMode,
	isSelected,
}: ChatListItemProps) => {
	const { messageMap, activeUsers, userId } = useStore(state => ({
		messageMap: state.messageMap,
		activeUsers: state.activeUsers,
		userId: state.userId,
	}));

	const messageList = messageMap[chatId] || [];
	const unreadNumber = messageList.filter(el => !el.isRead && el.authorId !== userId).length;
	const lastMessage = messageList.at(-1) || null;

	const pressHandler = useLongPress({ onLongPress, onPress });

	const isActive = useMemo(
		() => activeUsers.includes(interlocutor?.userId || ''),
		[activeUsers, interlocutor?.userId]
	);

	return (
		<StyledLabel htmlFor={chatId} {...pressHandler}>
			<ChatListItemInnerWrapper isDeleteMode={isSelectMode}>
				<UserWrapper>
					<UserNameWrapper>
						{interlocutor?.imageUrl ? (
							<UserPhotoImage src={interlocutor?.imageUrl} alt="photo" isActive={isActive} />
						) : (
							<UserPhotoStub isActive={isActive}>
								{interlocutor?.email.at(0)?.toUpperCase()}
							</UserPhotoStub>
						)}
						<ChatListItemUsername>{interlocutor?.username || interlocutor?.email}</ChatListItemUsername>
					</UserNameWrapper>
					{lastMessage && !isSelectMode ? (
						<ChatListItemDateWrapper>
							{new Intl.DateTimeFormat('en-US', options).format(new Date(lastMessage.createdAt))}
						</ChatListItemDateWrapper>
					) : null}
				</UserWrapper>
				{lastMessage ? (
					<UserWrapper>
						<ChatListItemMessageText>
							{lastMessage.text}
							{lastMessage.text && lastMessage.imageUrl ? <Italic> + </Italic> : null}
							{lastMessage.imageUrl ? <Italic>Image</Italic> : null}
						</ChatListItemMessageText>
						{unreadNumber && !isSelectMode ? <ChatUnreadMessages>{unreadNumber}</ChatUnreadMessages> : null}
					</UserWrapper>
				) : null}
			</ChatListItemInnerWrapper>
			{isSelectMode ? <StyledCheckbox id={chatId} checked={isSelected} /> : null}
		</StyledLabel>
	);
};
