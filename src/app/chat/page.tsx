import { ChatsList } from '@/app/chat/components/ChatsList';
import { Header } from '@/app/chat/components/Header';
import styles from './chat.module.css';
import { getUser } from '@/prismaActions/getUser';
import { FullScreenLoader } from '@/app/shared/components/FullScreenLoader';

export default async function ChatListPage() {
	const user = await getUser();

	if (!user) return <FullScreenLoader />;

	return (
		<div className={styles.wrapper}>
			<Header user={user} />
			<ChatsList />
		</div>
	);
}
