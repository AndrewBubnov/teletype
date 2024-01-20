import Link from 'next/link';
import Image from 'next/image';
import styles from '../chat.module.css';
import { PROFILE } from '@/constants';
import { User } from '@/types';
import { clsx } from 'clsx';
import { UserPhotoImage } from '@/app/shared/styled';

export const UserImage = ({ user }: { user: User }) => (
	<Link href={PROFILE}>
		{user.imageUrl ? (
			<Image src={user.imageUrl} height={40} width={40} alt="photo" priority className={styles.userPhotoImage} />
		) : (
			<div className={clsx(styles.userPhotoImage, styles.size40)}>{user.email.at(0)?.toUpperCase()}</div>
		)}
	</Link>
);
