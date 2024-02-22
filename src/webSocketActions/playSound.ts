import deleteMessageSound from '@/assets/audio/deleteMessageSound.wav';
import addMessageSound from '@/assets/audio/newMessageSound.mp3';
import { Message } from '@/types';
import { useCommonStore } from '@/store';

export const playDeleteMessageSound = () => {
	if (typeof window === 'undefined') return;
	const deleteMessageAudio = new Audio(deleteMessageSound);
	deleteMessageAudio.play().then();
};

export const playAddMessageSound = (authorId: string) => {
	if (typeof window === 'undefined') return;
	if (document.visibilityState === 'visible') return;
	const { userId } = useCommonStore.getState();
	if (authorId === userId) return;

	const notificationSound = document.createElement('audio');
	notificationSound.setAttribute('src', 'src/assets/audio/newMessageSound.mp3');
	notificationSound.setAttribute('autoplay', 'autoplay');
	notificationSound.setAttribute('muted', 'muted');
	notificationSound.style.display = 'none';
	notificationSound.play().then(() => document.removeChild(notificationSound));
	// const addMessageAudio = new Audio(addMessageSound);
	// addMessageAudio.play().then(console.log);
};
