import { ReactionsWrapper, StartDecorator } from '@/app/chat/[chatId]/styled';
import { Box } from '@mui/material';
import { reactions } from '@/app/chat/[chatId]/constants';

export const TextAreaStartDecorator = ({ emojiHandler }: { emojiHandler: (arg: string) => () => void }) => (
	<StartDecorator>
		<ReactionsWrapper>
			{reactions.map(reaction => (
				<Box key={reaction} onClick={emojiHandler(reaction)}>
					{String.fromCodePoint(parseInt(reaction, 16))}
				</Box>
			))}
		</ReactionsWrapper>
	</StartDecorator>
);
