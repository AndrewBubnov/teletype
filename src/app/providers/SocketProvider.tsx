'use client';
import { createContext, ReactNode } from 'react';
import { updateActiveUsers } from '@/utils/updateActiveUsers';
import { updateVisitorStatus } from '@/utils/updateVisitorStatus';
import { useUpdateData } from '@/app/hooks/useUpdateData';
import { useJoin } from '@/app/hooks/useJoin';
import { ChatVisitorStatus, SocketContextProps } from '@/types';

export const SocketContext = createContext<SocketContextProps>({} as SocketContextProps);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
	useJoin();
	const activeUsers = useUpdateData<string[]>(updateActiveUsers, []);
	const chatVisitorStatus = useUpdateData<ChatVisitorStatus>(updateVisitorStatus, {});

	return <SocketContext.Provider value={{ activeUsers, chatVisitorStatus }}>{children}</SocketContext.Provider>;
};
