import { useLayoutEffect, useRef } from 'react';
import { Box, Grow, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Backdrop, MenuCard, MenuDeleteIcon, MenuReplyIcon, ReactionsWrapper } from '@/app/chat/[chatId]/styled';
import getBoundingClientRect from '@popperjs/core/lib/dom-utils/getBoundingClientRect';

import { reactions } from '@/app/chat/[chatId]/constants';
import { ContextMenuProps } from '@/types';

export const ContextMenu = ({
	onAddReaction,
	closeContextMenu,
	initMenuParams,
	menuTop,
	onDeleteMessage,
}: ContextMenuProps) => {
	const ref = useRef();
	useLayoutEffect(() => {
		if (!ref.current) return;
		initMenuParams.current = getBoundingClientRect(ref.current) as DOMRect;
	}, []);
	return (
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
							<ListItemButton onClick={onDeleteMessage}>
								<ListItemIcon>
									<MenuDeleteIcon />
								</ListItemIcon>
								<ListItemText primary="Delete" />
							</ListItemButton>
						</ListItem>
						<ListItem disablePadding>
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
	);
};
