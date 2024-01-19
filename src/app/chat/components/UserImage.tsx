import Link from 'next/link';
import Image from 'next/image';
import { UserPhotoImage, UserPhotoStub } from '@/app/chat/styled';
import styles from '../chat.module.css';
import { PROFILE } from '@/constants';
import { User } from '@/types';

export const UserImage = ({ user }: { user: User }) => (
	<Link href={PROFILE}>
		{user.imageUrl ? (
			<Image src={user.imageUrl} height={40} width={40} alt="photo" priority className={styles.userPhotoImage} />
		) : (
			<div className={styles.userPhotoImage}>{user.email.at(0)?.toUpperCase()}</div>
		)}
	</Link>
);
