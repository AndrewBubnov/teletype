import { useContext, useMemo } from 'react';
import { useUser } from '@clerk/nextjs';
import { SocketContext } from '@/app/providers/SocketProvider';
import { MessageContext } from '@/app/chat/providers/MessageProvider';
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
	ChatListItemDateWrapper,
} from '@/app/chat/styled';
import { options } from '@/app/chat/[chatId]/constants';

import { ChatListItemProps } from '@/types';
export const ChatListItem = ({
	chatId,
	interlocutor,
	onPress,
	onLongPress,
	isDeleteMode,
	onCheckboxToggle,
	isChecked,
}: ChatListItemProps) => {
	const { user } = useUser();
	const userId = user?.id as string;

	const { activeUsers } = useContext(SocketContext);
	const { messageMap } = useContext(MessageContext);

	const messageList = messageMap[chatId] || [];
	const unreadNumber = messageList.filter(el => !el.isRead && el.authorId !== userId).length;
	const lastMessage = messageList.at(-1) || null;

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
						<ChatListItemDateWrapper>
							{new Intl.DateTimeFormat('en-US', options).format(new Date(lastMessage.date))}
						</ChatListItemDateWrapper>
					) : null}
				</UserWrapper>
				{lastMessage ? (
					<UserWrapper>
						<ChatListItemMessageText>{`${lastMessage.text}${
							lastMessage.imageUrl ? ' + Image' : ''
						}`}</ChatListItemMessageText>
						{unreadNumber && !isDeleteMode ? <ChatUnreadMessages>{unreadNumber}</ChatUnreadMessages> : null}
					</UserWrapper>
				) : null}
			</ChatListItemInnerWrapper>
			{isDeleteMode ? <StyledCheckbox onChange={onCheckboxToggle} checked={isChecked} /> : null}
		</ChatListItemWrapper>
	);
};
