import { useLayoutEffect, useRef } from 'react';
import { Box, Grow, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import {
	Backdrop,
	CheckIcon,
	DownloadIcon,
	EditIcon,
	MenuCard,
	MenuDeleteIcon,
	MenuReplyIcon,
	ReactionsWrapper,
} from '@/app/chat/[chatId]/styled';
import getBoundingClientRect from '@popperjs/core/lib/dom-utils/getBoundingClientRect';
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
	onSelect,
	onDownLoadImage,
	isAuthor,
}: ContextMenuProps) => {
	const ref = useRef();

	useLayoutEffect(() => {
		if (!ref.current) return;
		initMenuParams.current = getBoundingClientRect(ref.current) as DOMRect;
	}, [initMenuParams]);

	return (
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
							<ListItemButton onClick={onDeleteMessage}>
								<ListItemIcon>
									<MenuDeleteIcon />
								</ListItemIcon>
								<ListItemText primary="Delete" />
							</ListItemButton>
						</ListItem>
						<ListItem disablePadding>
							<ListItemButton onClick={onSelect}>
								<ListItemIcon>
									<CheckIcon />
								</ListItemIcon>
								<ListItemText primary="Select" />
							</ListItemButton>
						</ListItem>
						{isAuthor ? (
							<ListItem disablePadding>
								<ListItemButton onClick={onEditMessage}>
									<ListItemIcon>
										<EditIcon />
									</ListItemIcon>
									<ListItemText primary="Edit" />
								</ListItemButton>
							</ListItem>
						) : null}
						<ListItem disablePadding onClick={onReplyMessage}>
							<ListItemButton>
								<ListItemIcon>
									<MenuReplyIcon />
								</ListItemIcon>
								<ListItemText primary="Reply" />
							</ListItemButton>
						</ListItem>
						{onDownLoadImage ? (
							<ListItem disablePadding onClick={onDownLoadImage}>
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
	);
};
