import { ReactionContainer, StartDecorator } from '@/app/chat/[chatId]/styled';
import { reactions } from '@/app/chat/[chatId]/constants';

export const TextAreaStartDecorator = ({ emojiHandler }: { emojiHandler: (arg: string) => () => void }) => (
	<StartDecorator>
		{reactions.map(reaction => (
			<ReactionContainer key={reaction} onClick={emojiHandler(reaction)}>
				{String.fromCodePoint(parseInt(reaction, 16))}
			</ReactionContainer>
		))}
	</StartDecorator>
);
