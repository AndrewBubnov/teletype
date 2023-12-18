import { useContext, useMemo } from 'react';
import { useLongPress } from '@/app/chat/[chatId]/hooks/useLongPress';
import {
	ChatListItemWrapper,
	ChatUnreadMessages,
	StyledCheckbox,
	ChatListItemMessageText,
	UserPhotoImage,
	UserPhotoStub,
	UserWrapper,
	ChatListItemUsername,
	UserNameWrapper,
	ChatListItemInnerWrapper,
} from '@/app/chat/styled';
import { SocketContext } from '@/app/providers/SocketProvider';
import { ChatListItemProps } from '@/types';
import { useUnread } from '@/app/chat/[chatId]/hooks/useUnread';
import { options } from '@/app/chat/[chatId]/constants';

export const ChatListItem = ({
	interlocutor,
	onPress,
	onLongPress,
	isDeleteMode,
	onCheckboxToggle,
	isChecked,
	unreadNumberStored,
	lastMessageStored,
}: ChatListItemProps) => {
	const { activeUsers } = useContext(SocketContext);
	const { unreadNumber, lastMessage } = useUnread(unreadNumberStored, lastMessageStored);

	const pressHandler = useLongPress({ onLongPress, onPress });

	const isActive = useMemo(
		() => activeUsers.includes(interlocutor?.userId || ''),
		[activeUsers, interlocutor?.userId]
	);

	return (
		<ChatListItemWrapper {...pressHandler}>
			<ChatListItemInnerWrapper isDeleteMode={isDeleteMode}>
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
					{lastMessage && !isDeleteMode ? (
						<div style={{ fontSize: '0.7rem' }}>
							{new Intl.DateTimeFormat('en-US', options).format(new Date(lastMessage.date))}
						</div>
					) : null}
				</UserWrapper>
				{lastMessage ? (
					<UserWrapper>
						<ChatListItemMessageText>{lastMessage.text}</ChatListItemMessageText>
						{unreadNumber && !isDeleteMode ? <ChatUnreadMessages>{unreadNumber}</ChatUnreadMessages> : null}
					</UserWrapper>
				) : null}
			</ChatListItemInnerWrapper>
			{isDeleteMode ? <StyledCheckbox onChange={onCheckboxToggle} checked={isChecked} /> : null}
		</ChatListItemWrapper>
	);
};
