import { useState } from 'react';
import EmojiPicker, { EmojiClickData, EmojiStyle, Theme, Categories } from 'emoji-picker-react';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import { EmojiWrapper } from '@/app/chat/[chatId]/styled';
import EmojiIcon from '@mui/icons-material/EmojiEmotionsOutlined';

const categories = [{ category: Categories.SMILEYS_PEOPLE, name: 'smile' }];

export const Emoji = ({ onAddEmoji }: { onAddEmoji: (emoji: EmojiClickData) => void }) => {
	const [isActive, setIsActive] = useState<boolean>(false);
	const toggleActive = () => setIsActive(prevState => !prevState);

	const pickHandler = (data: EmojiClickData) => {
		setIsActive(false);
		onAddEmoji(data);
	};

	const closeHandler = () => setIsActive(false);

	return (
		<>
			{isActive && (
				<ClickAwayListener onClickAway={closeHandler}>
					<EmojiWrapper>
						<EmojiPicker
							onEmojiClick={pickHandler}
							height={500}
							theme={Theme.DARK}
							autoFocusSearch={false}
							emojiStyle={EmojiStyle.GOOGLE}
							categories={categories}
							searchDisabled
							lazyLoadEmojis
						/>
					</EmojiWrapper>
				</ClickAwayListener>
			)}
			<EmojiIcon onClick={toggleActive} />
		</>
	);
};
