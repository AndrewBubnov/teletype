import { UserImage } from '@/app/chat/components/UserImage';
import { Drawer } from '@/app/chat/components/Drawer';
import styles from '../chat.module.css';
import { User } from '@/types';

export const Header = ({ user }: { user: User }) => (
	<div className={styles.header}>
		<Drawer />
		<UserImage user={user} />
	</div>
);
