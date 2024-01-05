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
import { ConfirmDialog } from '@/app/chat/[chatId]/components/ConfirmDialog';
import { reactions } from '@/app/chat/[chatId]/constants';
import { ContextMenuProps } from '@/types';

export const ContextMenu = ({
	onAddReaction,
	onCloseMenu,
	initMenuParams,
	menuTop,
	onReplyMessage,
	onEditMessage,
	onDeleteMessage,
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

	const deleteMessageHandler = (evt: SyntheticEvent) => {
		evt.stopPropagation();
		setDialogOpen(true);
	};

	const closeDialogHandler = () => setDialogOpen(false);

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
								<ListItemButton onMouseDown={deleteMessageHandler} onTouchStart={deleteMessageHandler}>
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
				onConfirm={onDeleteMessage}
				interlocutorName={interlocutorName}
			/>
		</>
	);
};
