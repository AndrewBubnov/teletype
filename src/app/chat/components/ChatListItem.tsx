import { useMemo } from 'react';
import { useCommonStore, useMessageStore } from '@/store';
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
	ActiveWrapper,
	Active,
	LastMessageWrapper,
	MicroPreviewImage,
} from '@/app/chat/styled';
import { options } from '@/app/chat/[chatId]/constants';
import { StyledCheckbox } from '@/app/shared/styled';
import { StyledLabel } from '@/app/styled';
import { ChatListItemProps } from '@/types';
import Image from 'next/image';

export const ChatListItem = ({
	chatId,
	interlocutor,
	onPress,
	onLongPress,
	isSelectMode,
	isSelected,
}: ChatListItemProps) => {
	const { activeUsers, userId } = useCommonStore(state => ({
		activeUsers: state.activeUsers,
		userId: state.userId,
	}));
	const messageMap = useMessageStore(state => state.messageMap);

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
							<ActiveWrapper>
								<UserPhotoImage src={interlocutor?.imageUrl} alt="photo" />
								{isActive ? <Active /> : null}
							</ActiveWrapper>
						) : (
							<UserPhotoStub>{interlocutor?.email.at(0)?.toUpperCase()}</UserPhotoStub>
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
						<LastMessageWrapper>
							{lastMessage.imageUrl ? (
								<MicroPreviewImage src={lastMessage.imageUrl} alt="preview" />
							) : null}

							{lastMessage.text && lastMessage.imageUrl ? '+' : null}
							<ChatListItemMessageText>{lastMessage.text}</ChatListItemMessageText>
						</LastMessageWrapper>
						{unreadNumber && !isSelectMode ? <ChatUnreadMessages>{unreadNumber}</ChatUnreadMessages> : null}
					</UserWrapper>
				) : null}
			</ChatListItemInnerWrapper>
			{isSelectMode ? <StyledCheckbox id={chatId} checked={isSelected} /> : null}
		</StyledLabel>
	);
};
