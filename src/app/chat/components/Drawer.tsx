'use client';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { SignOutButton } from '@clerk/nextjs';
import { SideDrawer } from '@/app/chat/components/SideDrawer';
import { UserSelect } from '@/app/chat/components/UserSelect';
import { sendLogOut } from '@/webSocketActions/sendLogOut';
import { IoMenuOutline as MenuIcon } from 'react-icons/io5';
import { RxAvatar as ProfileIcon } from 'react-icons/rx';
import { IoMdSearch as SearchIcon } from 'react-icons/io';
import { AiOutlineLogout as LogoutIcon } from 'react-icons/ai';
import { PROFILE } from '@/constants';
import styles from '../chat.module.css';

export const Drawer = () => {
	const { push } = useRouter();

	const [isOpen, setIsOpen] = useState(false);

	const onClose = useCallback(() => setIsOpen(false), []);

	const onSignOut = useCallback(() => {
		push('/');
		sendLogOut();
	}, [push]);

	return (
		<>
			<button onClick={() => setIsOpen(true)} className={styles.iconButton}>
				<MenuIcon />
			</button>
			<SideDrawer isOpen={isOpen} onClose={onClose}>
				<ul>
					<li className={styles.drawerListItem}>
						<Link href={PROFILE} className={styles.profileLink}>
							<ProfileIcon />
							<span>Profile</span>
						</Link>
					</li>
					<li className={styles.drawerListItem}>
						<div>
							<div className={styles.newChatInnerWrapper}>
								<SearchIcon />
								<span>New chat</span>
							</div>
							<UserSelect canOpen={isOpen} closeDrawer={onClose} />
						</div>
					</li>
					<li className={styles.drawerListItem}>
						<SignOutButton signOutCallback={onSignOut}>
							<div className={styles.flexCenterWrapper}>
								<LogoutIcon />
								<span>Log out</span>
							</div>
						</SignOutButton>
					</li>
				</ul>
			</SideDrawer>
		</>
	);
};
