import { ReplyTo } from '@/app/chat/[chatId]/components/ReplyTo';
import Image from 'next/image';
import { MessageItem, ReactionWrapper, TimeWrapper } from '@/app/chat/[chatId]/styled';
import { options } from '@/app/chat/[chatId]/constants';
import { MessageProps, MessageType } from '@/types';

export const ImageMessage = ({ isAuthoredByUser, onPress, message, repliedMessage }: MessageProps) => (
	<MessageItem transparent isAuthoredByUser={isAuthoredByUser} onClick={onPress}>
		<ReplyTo message={repliedMessage} />
		<Image
			src={message.imageUrl!}
			width={message.type === MessageType.EMOJI ? 40 : 100}
			height={message.type === MessageType.EMOJI ? 40 : 100}
			alt=""
		/>
		{message.reaction && <ReactionWrapper>{String.fromCodePoint(parseInt(message.reaction, 16))}</ReactionWrapper>}
		<TimeWrapper>{new Intl.DateTimeFormat('en-US', options).format(new Date(message.date))}</TimeWrapper>
	</MessageItem>
);
