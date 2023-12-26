import { getUser } from '@/actions/getUser';
import { Profile } from '@/app/profile/components/Profile';

export default async function ProfilePage() {
	const user = await getUser();

	return <Profile user={user} />;
}
