import { unstable_noStore as noStore } from 'next/cache';
import { ChatsList } from '@/app/chat-list/components/ChatsList/ChatsList';
import { Header } from '@/app/chat-list/components/Header/Header';
import { getUser } from '@/prismaActions/getUser';
import { getUserChats } from '@/prismaActions/getUserChats';
import { FullScreenLoader } from '@/app/shared/components/FullScreenLoader';
import { WideMode } from '@/app/chat-list/components/WideMode/WideMode';
import styles from './chatList.module.css';

export default async function ChatListPage() {
	noStore();

	const user = await getUser();
	const userChats = await getUserChats(user.chatIds);

	if (!user) return <FullScreenLoader />;

	return (
		<div className={styles.wrapper}>
			<Header user={user} />
			{userChats.length ? (
				<div className={styles.flex}>
					<ChatsList />
					<WideMode />
				</div>
			) : null}
		</div>
	);
}
