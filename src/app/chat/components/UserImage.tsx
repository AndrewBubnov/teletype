import { getUser } from '@/actions/getUser';
import { UserPhotoImage, UserPhotoStub } from '@/app/chat/styled';

export const UserImage = async () => {
	const user = await getUser();

	if (!user) return null;

	return user.imageUrl ? (
		<UserPhotoImage src={user.imageUrl} size={40} alt="photo" isActive={false} priority />
	) : (
		<UserPhotoStub isActive={false} size={40}>
			{user.email.at(0)?.toUpperCase()}
		</UserPhotoStub>
	);
};
