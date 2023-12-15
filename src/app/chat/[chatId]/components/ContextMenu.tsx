import { SyntheticEvent, useLayoutEffect, useRef, useState } from 'react';
import { Box, Grow, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Backdrop, MenuCard, MenuDeleteIcon, MenuReplyIcon, ReactionsWrapper } from '@/app/chat/[chatId]/styled';
import getBoundingClientRect from '@popperjs/core/lib/dom-utils/getBoundingClientRect';
import { reactions } from '@/app/chat/[chatId]/constants';
import { sendEditMessage } from '@/utils/sendEditMessage';
import { deleteSingleMessage } from '@/actions/deleteSingleMessage';
import { ConfirmDialog } from '@/app/chat/[chatId]/components/ConfirmDialog';
import { ContextMenuProps } from '@/types';

export const ContextMenu = ({
	menuActiveId,
	chatId,
	onAddReaction,
	closeContextMenu,
	initMenuParams,
	menuTop,
	onReplyMessage,
	interlocutorName,
}: ContextMenuProps) => {
	const [dialogOpen, setDialogOpen] = useState<boolean>(false);

	const ref = useRef();

	useLayoutEffect(() => {
		if (!ref.current) return;
		initMenuParams.current = getBoundingClientRect(ref.current) as DOMRect;
	}, [initMenuParams]);

	const onDeleteMessage = (evt: SyntheticEvent) => {
		evt.stopPropagation();
		setDialogOpen(true);
	};

	const cancelDeleteHandler = () => setDialogOpen(false);

	const deleteMessageHandler = (informBoth: boolean) => async () => {
		const editMessageParams = {
			messageId: menuActiveId,
			message: null,
			roomId: chatId,
			authorOnly: !informBoth,
		};
		sendEditMessage(editMessageParams);
		if (informBoth) await deleteSingleMessage(menuActiveId, chatId);
		cancelDeleteHandler();
		closeContextMenu();
	};
	return (
		<>
			<Backdrop onClick={closeContextMenu}>
				<Grow in style={{ transformOrigin: '0 0 0' }}>
					<MenuCard ref={ref} style={{ transform: `translateY(${menuTop}px)` }}>
						<ReactionsWrapper>
							{reactions.map(reaction => (
								<Box key={reaction} onClick={() => onAddReaction(reaction)}>
									{String.fromCodePoint(parseInt(reaction, 16))}
								</Box>
							))}
						</ReactionsWrapper>
						<List>
							<ListItem disablePadding>
								<ListItemButton onMouseDown={onDeleteMessage} onTouchStart={onDeleteMessage}>
									<ListItemIcon>
										<MenuDeleteIcon />
									</ListItemIcon>
									<ListItemText primary="Delete" />
								</ListItemButton>
							</ListItem>
							<ListItem disablePadding onMouseDown={onReplyMessage} onTouchStart={onReplyMessage}>
								<ListItemButton>
									<ListItemIcon>
										<MenuReplyIcon />
									</ListItemIcon>
									<ListItemText primary="Reply" />
								</ListItemButton>
							</ListItem>
						</List>
					</MenuCard>
				</Grow>
			</Backdrop>
			<ConfirmDialog
				open={dialogOpen}
				onCancel={cancelDeleteHandler}
				onConfirm={deleteMessageHandler}
				interlocutorName={interlocutorName}
			/>
		</>
	);
};
