import { UserSelect } from '@/app/chat/components/UserSelect';
import { Wrapper } from '@/app/chat/styled';
import { ChatsList } from '@/app/chat/components/ChatsList';
import { Header } from '@/app/chat/components/Header';

export default async function ChatListPage() {
	return (
		<Wrapper>
			<Header />
			<UserSelect />
			<ChatsList />
		</Wrapper>
	);
}
