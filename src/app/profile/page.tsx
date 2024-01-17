import { getUser } from '@/prismaActions/getUser';
import { Profile } from '@/app/profile/components/Profile';

export default async function ProfilePage() {
	const user = await getUser();

	return <Profile user={user} />;
}
