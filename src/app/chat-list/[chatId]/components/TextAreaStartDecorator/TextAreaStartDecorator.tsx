import { reactions } from '@/app/chat-list/[chatId]/constants';
import styles from './TextAreaStartDecorator.module.css';

export const TextAreaStartDecorator = ({ emojiHandler }: { emojiHandler: (arg: string) => () => void }) => (
	<div className={styles.startDecorator}>
		{reactions.map(reaction => (
			<div className={styles.reactionContainer} key={reaction} onClick={emojiHandler(reaction)}>
				{String.fromCodePoint(parseInt(reaction, 16))}
			</div>
		))}
	</div>
);
