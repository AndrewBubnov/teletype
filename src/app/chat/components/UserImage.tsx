import { getUser } from '@/actions/getUser';
import { UserPhotoImage, UserPhotoStub } from '@/app/chat/styled';
import Link from 'next/link';
import { PROFILE } from '@/constants';

export const UserImage = async () => {
	const user = await getUser();

	if (!user) return null;

	return (
		<Link href={PROFILE}>
			{user.imageUrl ? (
				<UserPhotoImage src={user.imageUrl} size={40} alt="photo" priority />
			) : (
				<UserPhotoStub size={40}>{user.email.at(0)?.toUpperCase()}</UserPhotoStub>
			)}
		</Link>
	);
};
