'use client';
import { ChangeEvent, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ChatWrapper, SendMessageForm, SendMessageFormWrapper } from '@/app/chat/[chatId]/styled';
import { StyledInput } from '@/app/chat/styled';
import { Box, InputAdornment } from '@mui/material';
import { addMessageToChat } from '@/actions/addMessageToChat';
import { sendMessageToServer } from '@/utils/sendMessageToServer';
import { ChatHeader } from '@/app/chat/[chatId]/components/ChatHeader';
import { Emoji } from '@/app/chat/[chatId]/components/Emoji';
import { EmojiClickData } from 'emoji-picker-react';
import { ChatProps, MessageType } from '@/types';
import { SingleMessage } from '@/app/chat/[chatId]/components/SingleMessage';
import { useMessageList } from '@/app/chat/[chatId]/hooks/useMessageList';
import { addReactionToMessage } from '@/actions/addReactionToMessage';
import { sendEditMessage } from '@/utils/sendEditMessage';
import { useUser } from '@clerk/nextjs';
import { ContextMenu } from '@/app/chat/[chatId]/components/ContextMenu';
import getBoundingClientRect from '@popperjs/core/lib/dom-utils/getBoundingClientRect';

export const Chat = ({ chat }: ChatProps) => {
	const { user } = useUser();
	const userId = user?.id as string;
	const { messages, members, chatId } = chat;
	const author = members.find(user => user.userId === userId);
	const interlocutor = members.find(user => user.userId !== userId);
	const interlocutorId = interlocutor?.userId || '';
	const interlocutorName = interlocutor?.username || interlocutor?.email || '';
	const authorImageUrl = author?.imageUrl;
	const interlocutorImageUrl = interlocutor?.imageUrl;

	const { messageList, addReaction } = useMessageList({ messages, chatId, interlocutorId, authorImageUrl });

	const [messageText, setMessageText] = useState<string>('');
	const [messageImageUrl, setMessageImageUrl] = useState<string>('');
	const [menuActiveId, setMenuActiveId] = useState<string>('');
	const [messageParams, setMessageParams] = useState<DOMRect | null>(null);
	const [menuTop, setMenuTop] = useState<number>(0);
	const [messageType, setMessageType] = useState<MessageType>(MessageType.TEXT);

	const initMenuParams = useRef<DOMRect | null>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const containerParams = useRef<DOMRect | null>(null);

	useLayoutEffect(() => {
		if (!containerRef.current) return;
		containerParams.current = getBoundingClientRect(containerRef.current) as DOMRect;
	}, []);

	useEffect(() => {
		if (!menuActiveId) return;
		const messageTop = messageParams?.top || 0;
		const messageHeight = messageParams?.height || 0;
		const menuHeight = initMenuParams.current?.height || 0;
		const containerTop = containerParams.current?.top || 0;
		const containerHeight = containerParams.current?.height || 0;
		const relativeTop = messageTop - containerTop;
		setMenuTop(Math.min(Math.max(0, relativeTop - (menuHeight - messageHeight) / 2), containerHeight - menuHeight));
	}, [menuActiveId]);

	const changeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
		setMessageText(evt.target.value);
		setMessageImageUrl('');
		setMessageType(MessageType.TEXT);
	};
	const submitHandler = async () => {
		setMessageText('');
		setMessageImageUrl('');
		const message = await addMessageToChat({
			chatId,
			authorId: userId,
			messageType,
			messageText,
			messageImageUrl,
		});
		if (message) sendMessageToServer(message, chatId);
		setMessageType(MessageType.TEXT);
	};

	const contextMenuToggleHandler = (id: string) => (type: 'open' | 'close', messageParams: DOMRect) => {
		setMessageParams(messageParams);
		setMenuActiveId(prevState => {
			if (type === 'open') return prevState ? '' : id;
			return '';
		});
	};

	const closeMenuHandler = () => setMenuActiveId('');

	const onAddEmoji = (data: EmojiClickData) => {
		if (!messageText) {
			setMessageType(MessageType.EMOJI);
			setMessageImageUrl(data.imageUrl);
		}
		setMessageText(prevState => `${prevState} ${data.emoji}`);
	};

	const addReactionHandler = async (reactionString: string) => {
		const message = messageList.find(el => el.id === menuActiveId);
		if (!message) return;
		const reaction = message.reaction === reactionString ? '' : reactionString;
		addReaction(message.id, reaction);
		const updated = (await addReactionToMessage(message.id, reaction)) || message;
		sendEditMessage({ messageId: message.id, message: updated, roomId: chatId });
		setMenuActiveId('');
	};

	return (
		<Box>
			<ChatHeader
				chatId={chatId}
				interlocutorId={interlocutorId}
				interlocutorName={interlocutorName}
				interlocutorImageUrl={interlocutorImageUrl}
			/>
			<Box style={{ position: 'relative' }}>
				<ChatWrapper ref={containerRef}>
					{messageList.map(message => (
						<SingleMessage
							key={message.id}
							message={message}
							onContextMenuToggle={contextMenuToggleHandler(message.id)}
							menuActive={menuActiveId === message.id}
							onAddReaction={addReactionHandler}
						/>
					))}
				</ChatWrapper>
				{!!menuActiveId && (
					<ContextMenu
						onAddReaction={addReactionHandler}
						closeContextMenu={closeMenuHandler}
						initMenuParams={initMenuParams}
						menuTop={menuTop}
					/>
				)}
			</Box>

			<SendMessageFormWrapper>
				<SendMessageForm action={submitHandler}>
					<StyledInput
						fullWidth
						value={messageText}
						onChange={changeHandler}
						label="Type here.."
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<Emoji onAddEmoji={onAddEmoji} />
								</InputAdornment>
							),
						}}
					/>
				</SendMessageForm>
			</SendMessageFormWrapper>
		</Box>
	);
};
