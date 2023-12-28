import { Wrapper } from '@/app/chat/styled';
import { ChatsList } from '@/app/chat/components/ChatsList';
import { Header } from '@/app/chat/components/Header';

export default async function ChatListPage() {
	return (
		<Wrapper>
			<Header />
			<ChatsList />
		</Wrapper>
	);
}
