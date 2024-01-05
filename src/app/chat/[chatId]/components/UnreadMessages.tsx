import {
	UnreadNumber,
	UnreadNumberIcon,
	UnreadNumberIconWrapper,
	UnreadNumberButton,
} from '@/app/chat/[chatId]/styled';
import { ScrollToBottomButtonProps } from '@/types';

export const UnreadMessages = ({ unreadNumber, onPress }: ScrollToBottomButtonProps) => (
	<UnreadNumberButton onTouchStart={onPress} onMouseDown={onPress}>
		<UnreadNumber>{unreadNumber}</UnreadNumber>
		<UnreadNumberIconWrapper>
			<UnreadNumberIcon />
		</UnreadNumberIconWrapper>
	</UnreadNumberButton>
);
