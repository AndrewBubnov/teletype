import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { SocketProvider } from '@/app/providers/SocketProvider';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Teletype',
	description: 'Chat app',
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<ClerkProvider>
			<SocketProvider>
				<html lang="en">
					<body className={inter.className}>{children}</body>
				</html>
			</SocketProvider>
		</ClerkProvider>
	);
}
