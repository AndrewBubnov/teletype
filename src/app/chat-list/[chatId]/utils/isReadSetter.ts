import { Message } from '@/types';

export const isReadSetter = (messageId: string) => (prevState: Message[]) =>
	prevState.map(el => {
		if (el.id === messageId)
			return {
				...el,
				isRead: true,
			};
		return el;
	});
