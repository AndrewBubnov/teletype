import { SyntheticEvent, useLayoutEffect, useRef, useState } from 'react';
import { Box, Grow, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import {
	Backdrop,
	DownloadIcon,
	EditIcon,
	MenuCard,
	MenuDeleteIcon,
	MenuReplyIcon,
	ReactionsWrapper,
} from '@/app/chat/[chatId]/styled';
import getBoundingClientRect from '@popperjs/core/lib/dom-utils/getBoundingClientRect';
import { reactions } from '@/app/chat/[chatId]/constants';
import { sendEditMessage } from '@/utils/sendEditMessage';
import { ConfirmDialog } from '@/app/chat/[chatId]/components/ConfirmDialog';
import { ContextMenuProps } from '@/types';

export const ContextMenu = ({
	menuActiveId,
	chatId,
	onAddReaction,
	onCloseMenu,
	initMenuParams,
	menuTop,
	onReplyMessage,
	onEditMessage,
	interlocutorName,
	onDownLoadImage,
	isAuthor,
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

	const closeDialogHandler = () => setDialogOpen(false);

	const deleteMessageHandler = (informBoth: boolean) => () => {
		sendEditMessage({
			messageId: menuActiveId,
			message: null,
			roomId: chatId,
			authorOnly: !informBoth,
		});
		closeDialogHandler();
		onCloseMenu();
	};
	return (
		<>
			<Backdrop onClick={onCloseMenu}>
				<Grow in style={{ transformOrigin: '0 0 0' }}>
					<MenuCard ref={ref} style={{ transform: `translateY(${menuTop}px)` }}>
						{!isAuthor ? (
							<ReactionsWrapper>
								{reactions.map(reaction => (
									<Box key={reaction} onClick={() => onAddReaction(reaction)}>
										{String.fromCodePoint(parseInt(reaction, 16))}
									</Box>
								))}
							</ReactionsWrapper>
						) : null}
						<List>
							<ListItem disablePadding>
								<ListItemButton onMouseDown={onDeleteMessage} onTouchStart={onDeleteMessage}>
									<ListItemIcon>
										<MenuDeleteIcon />
									</ListItemIcon>
									<ListItemText primary="Delete" />
								</ListItemButton>
							</ListItem>
							{isAuthor ? (
								<ListItem disablePadding>
									<ListItemButton onMouseDown={onEditMessage} onTouchStart={onEditMessage}>
										<ListItemIcon>
											<EditIcon />
										</ListItemIcon>
										<ListItemText primary="Edit" />
									</ListItemButton>
								</ListItem>
							) : null}
							<ListItem disablePadding onMouseDown={onReplyMessage} onTouchStart={onReplyMessage}>
								<ListItemButton>
									<ListItemIcon>
										<MenuReplyIcon />
									</ListItemIcon>
									<ListItemText primary="Reply" />
								</ListItemButton>
							</ListItem>
							{onDownLoadImage ? (
								<ListItem disablePadding onMouseDown={onDownLoadImage} onTouchStart={onDownLoadImage}>
									<ListItemButton>
										<ListItemIcon>
											<DownloadIcon />
										</ListItemIcon>
										<ListItemText primary="Download" />
									</ListItemButton>
								</ListItem>
							) : null}
						</List>
					</MenuCard>
				</Grow>
			</Backdrop>
			<ConfirmDialog
				open={dialogOpen}
				onCancel={closeDialogHandler}
				onConfirm={deleteMessageHandler}
				interlocutorName={interlocutorName}
			/>
		</>
	);
};
