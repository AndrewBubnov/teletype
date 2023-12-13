import { useLayoutEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { Backdrop, MenuCard, ReactionsWrapper } from '@/app/chat/[chatId]/styled';
import getBoundingClientRect from '@popperjs/core/lib/dom-utils/getBoundingClientRect';
import { smiles } from '@/app/chat/[chatId]/constants';
import { ContextMenuProps } from '@/types';

export const ContextMenu = ({ onAddReaction, closeContextMenu, initMenuParams, menuTop }: ContextMenuProps) => {
	const ref = useRef();
	useLayoutEffect(() => {
		if (!ref.current) return;
		const params = getBoundingClientRect(ref.current);
		initMenuParams.current = getBoundingClientRect(ref.current) as DOMRect;
	}, []);
	return (
		<Backdrop onClick={closeContextMenu}>
			<MenuCard ref={ref} style={{ transform: `translateY(${menuTop}px)` }}>
				<ReactionsWrapper>
					{smiles.map(reaction => (
						<Box key={reaction} onClick={() => onAddReaction(reaction)}>
							{String.fromCodePoint(parseInt(reaction, 16))}
						</Box>
					))}
				</ReactionsWrapper>
				<Typography>Reply</Typography>
				<Typography>Delete</Typography>
			</MenuCard>
		</Backdrop>
	);
};
