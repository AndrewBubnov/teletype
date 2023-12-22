'use client';
import { useWebsockets } from '@/app/hooks/useWebsockets';

export const ClientSource = () => {
	useWebsockets();
	return null;
};
