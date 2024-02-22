import { CSSProperties, Fragment } from 'react';
import { MessageBottom } from '@/app/chat-list/[chatId]/components/MessageBottom/MessageBottom';
import { StyledElement } from '@/app/chat-list/[chatId]/components/StyledElement/StyledElement';
import { EmojiMessageProps } from '@/types';
import styles from './EmojiMessage.module.css';

export const EmojiMessage = ({ isAuthoredByUser, message, isSelectMode, xOffset }: EmojiMessageProps) => {
	if (!message.text) return null;

	return (
		<StyledElement
			element="div"
			className="messageItem"
			styles={styles}
			attributes={{
				singlePadding: true,
				transparent: true,
				isAuthoredByUser,
				isMoved: isAuthoredByUser && isSelectMode,
			}}
			style={{ '--x-offset': xOffset } as CSSProperties}
		>
			<div className={styles.emojiDisplayWrapper}>
				{message.text
					.split(' ')
					.slice(1)
					.map((emoji, index) => (
						<Fragment key={`${emoji}${index}`}>{emoji}</Fragment>
					))}
			</div>
			<MessageBottom message={message} withOffset />
		</StyledElement>
	);
};
