import { ReactNode } from 'react';

export default function ChatListLayout({ children, singleChat }: { children: ReactNode; singleChat: ReactNode }) {
	return (
		<div style={{ display: 'flex' }}>
			{children}
			{singleChat}
		</div>
	);
}
