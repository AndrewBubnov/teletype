import { ReactNode } from 'react';
import { ChatProvider } from '@/app/chat/providers/ChatProvider';

export default function ChatLayout({ children }: { children: ReactNode }) {
	return <ChatProvider>{children}</ChatProvider>;
}
