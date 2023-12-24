import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { auth, ClerkProvider } from '@clerk/nextjs';
import { Fetcher } from '@/app/chat/[chatId]/components/Fetcher';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Teletype',
	description: 'Chat app',
};

export default function RootLayout({ children }: { children: ReactNode }) {
	const userId = auth().userId;
	return (
		<ClerkProvider>
			<html lang="en">
				<body className={inter.className}>
					{userId && <Fetcher />}
					{children}
				</body>
			</html>
		</ClerkProvider>
	);
}
