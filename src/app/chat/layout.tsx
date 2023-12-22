import { ReactNode } from 'react';
import { MessageProvider } from '@/app/chat/providers/MessageProvider';

export default function ChatLayout({ children }: { children: ReactNode }) {
	return <MessageProvider>{children}</MessageProvider>;
}
