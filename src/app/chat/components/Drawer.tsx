'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IconButton, ListItemIcon, ListItemText } from '@mui/material';
import { Drawer as MuiDrawer } from '@mui/joy';
import { UserSelect } from '@/app/chat/components/UserSelect';
import { SignOutButton } from '@clerk/nextjs';
import {
	DrawerInnerWrapper,
	DrawerList,
	DrawerListItem,
	FlexCenterWrapper,
	LogoutIcon,
	MenuIcon,
	NewChatMenuInnerWrapper,
	NewChatMenuWrapper,
	ProfileIcon,
	SearchIcon,
	StyledLink,
} from '@/app/chat/styled';
import { PROFILE } from '@/constants';

export const Drawer = () => {
	const { push } = useRouter();
	const [open, setOpen] = useState(false);

	return (
		<>
			<IconButton onClick={() => setOpen(true)}>
				<MenuIcon />
			</IconButton>
			<MuiDrawer open={open} onClose={() => setOpen(false)}>
				<DrawerInnerWrapper>
					<DrawerList>
						<DrawerListItem disablePadding>
							<StyledLink href={PROFILE}>
								<ProfileIcon />
								<ListItemText primary="Profile" />
							</StyledLink>
						</DrawerListItem>
						<DrawerListItem disablePadding>
							<NewChatMenuWrapper>
								<NewChatMenuInnerWrapper>
									<SearchIcon />
									<ListItemText primary="New chat" />
								</NewChatMenuInnerWrapper>
								<UserSelect canOpen={open} />
							</NewChatMenuWrapper>
						</DrawerListItem>
						<DrawerListItem disablePadding>
							<SignOutButton signOutCallback={() => push('/')}>
								<FlexCenterWrapper>
									<ListItemIcon>
										<LogoutIcon />
									</ListItemIcon>
									<ListItemText primary="Log out" />
								</FlexCenterWrapper>
							</SignOutButton>
						</DrawerListItem>
					</DrawerList>
				</DrawerInnerWrapper>
			</MuiDrawer>
		</>
	);
};
