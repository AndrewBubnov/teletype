import { Message } from '@/types';

export const addReactionSetter =
	(messageId: string, reaction: string, authorImageUrl?: string | null) => (prevState: Message[]) =>
		prevState.map(message => {
			if (message.id === messageId) {
				return {
					...message,
					reaction,
					reactionAuthorImageUrl: reaction ? authorImageUrl : undefined,
				};
			}
			return message;
		});
