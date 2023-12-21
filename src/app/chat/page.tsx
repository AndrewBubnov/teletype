import { getAllUserEmails } from '@/actions/getAllUserEmails';
import { getUser } from '@/actions/getUser';
import { UserSelect } from '@/app/chat/components/UserSelect';
import { Wrapper } from '@/app/chat/styled';
import { MainProvider } from '@/app/chat/providers/MainProvider';
import { getUserChats } from '@/actions/getUserChats';
import { ChatsList } from '@/app/chat/components/ChatsList';
import { Header } from '@/app/chat/components/Header';

export default async function ChatListPage() {
	const user = await getUser();
	const userEmails = await getAllUserEmails();
	const userChats = await getUserChats(user.chatIds);

	return (
		<Wrapper>
			<Header />
			<MainProvider userEmails={userEmails} userId={user.userId} userChats={userChats}>
				<UserSelect />
				<ChatsList />
			</MainProvider>
		</Wrapper>
	);
}
