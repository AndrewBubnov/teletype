import { ChatsList } from '@/app/chat-list/components/ChatsList';
import { Header } from '@/app/chat-list/components/Header';
import { getUser } from '@/prismaActions/getUser';
import { FullScreenLoader } from '@/app/shared/components/FullScreenLoader';
import { ChatWrapper } from '@/app/chat-list/components/ChatWrapper';
import styles from './chat.module.css';

export default async function ChatListPage() {
	const user = await getUser();

	if (!user) return <FullScreenLoader />;

	return (
		<div className={styles.wrapper}>
			<Header user={user} />
			<div className={styles.flex}>
				<ChatsList />
				<ChatWrapper />
			</div>
		</div>
	);
}
