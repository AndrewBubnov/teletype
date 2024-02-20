import { UserImage } from '@/app/chat-list/components/UserImage/UserImage';
import { Drawer } from '@/app/chat-list/components/Drawer/Drawer';
import { User } from '@/types';
import styles from './Header.module.css';

export const Header = ({ user }: { user: User }) => (
	<div className={styles.header}>
		<Drawer />
		<UserImage user={user} />
	</div>
);
