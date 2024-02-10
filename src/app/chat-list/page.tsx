import { ChatsList } from '@/app/chat-list/components/ChatsList';
import { Header } from '@/app/chat-list/components/Header';
import { getUser } from '@/prismaActions/getUser';
import { FullScreenLoader } from '@/app/shared/components/FullScreenLoader';
import styles from './chat.module.css';

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
