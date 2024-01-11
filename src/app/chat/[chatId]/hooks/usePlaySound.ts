'use client';
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { Message } from '@/types';
import sound from '@/assets/audio/deleteMessageSound.wav';

const audio = new Audio(sound);

export const usePlaySound = () => {
	const user = useUser();
	const userId = user.user?.id;
	const [isVisible, setIsVisible] = useState<boolean>(true);

	useEffect(() => {
		const handler = () => setIsVisible(document.visibilityState === 'visible');
		document.addEventListener('visibilitychange', handler);
		return () => document.removeEventListener('visibilitychange', handler);
	}, []);

	const getUserId = () => userId;

	return (message?: Message) => {
		if (!message?.isRead && message?.id !== getUserId() && !isVisible) audio.play().then();
	};
};
