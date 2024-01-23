import { ReplyTo } from '@/app/chat/[chatId]/components/ReplyTo';
import { MessageBottom } from '@/app/chat/[chatId]/components/MessageBottom';
import { MessageProps } from '@/types';
import { StyledElement } from '@/app/chat/[chatId]/components/StyledElement';
import styles from '../chatId.module.css';

export const EmojiMessage = ({ isAuthoredByUser, message, repliedMessage }: MessageProps) => {
	if (!message.text) return null;

	return (
		<StyledElement
			element="div"
			className="messageItem"
			styles={styles}
			attributes={{ singlePadding: true, transparent: true, isAuthoredByUser }}
		>
			<ReplyTo message={repliedMessage} />
			<div className={styles.emojiDisplayWrapper}>
				{message.text.split(' ').map((emoji, index) => (
					<div key={`${emoji}${index}`}>{emoji}</div>
				))}
			</div>
			<MessageBottom message={message} withOffset={true} />
		</StyledElement>
	);
};
