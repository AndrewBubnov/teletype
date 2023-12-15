import { useContext, useMemo } from 'react';
import { useLongPress } from '@/app/chat/[chatId]/hooks/useLongPress';
import { StyledCheckbox, UserNameWrapper, UserPhotoImage, UserPhotoStub, UserWrapper } from '@/app/chat/styled';
import { SocketContext } from '@/app/providers/SocketProvider';
import { ChatListItemProps } from '@/types';
import { FlexWrapper } from '@/app/shared/styled';

export const ChatListItem = ({
	interlocutor,
	onPress,
	onLongPress,
	mode,
	onCheckboxToggle,
	isChecked,
}: ChatListItemProps) => {
	const { activeUsers } = useContext(SocketContext);

	const pressHandler = useLongPress({ onLongPress, onPress });

	const isActive = useMemo(
		() => activeUsers.includes(interlocutor?.userId || ''),
		[activeUsers, interlocutor?.userId]
	);

	return (
		<FlexWrapper>
			<UserWrapper {...pressHandler}>
				<FlexWrapper>
					{interlocutor?.imageUrl ? (
						<UserPhotoImage src={interlocutor?.imageUrl} alt="photo" isActive={isActive} />
					) : (
						<UserPhotoStub isActive={isActive}>{interlocutor?.email.at(0)?.toUpperCase()}</UserPhotoStub>
					)}
					<UserNameWrapper>{interlocutor?.username || interlocutor?.email}</UserNameWrapper>
				</FlexWrapper>
			</UserWrapper>
			{mode === 'delete' ? <StyledCheckbox onChange={onCheckboxToggle} checked={isChecked} /> : null}
		</FlexWrapper>
	);
};
