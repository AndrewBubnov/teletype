'use client';
import { useAddSubscriptions } from '@/app/hooks/useAddSubscriptions';

export const ClientSource = () => {
	useAddSubscriptions();
	return null;
};
