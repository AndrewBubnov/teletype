import deleteMessageSound from '@/assets/audio/deleteMessageSound.wav';
import addMessageSound from '@/assets/audio/newMessageSound.mp3';
import { Message } from '@/types';

export const playDeleteMessageSound = () => {
	if (typeof window === 'undefined') return;
	const deleteMessageAudio = new Audio(deleteMessageSound);
	deleteMessageAudio.play().then();
};

export const playAddMessageSound = (message: Message, userId: string) => {
	if (typeof window === 'undefined') return;
	if (document.visibilityState === 'visible') return;
	if (message.authorId === userId) return;
	const addMessageAudio = new Audio(addMessageSound);
	addMessageAudio.play().then();
};
