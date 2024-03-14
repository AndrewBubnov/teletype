import { Message, UpdateMessageType } from '@/types';

export const updateMessageSetter = (updateData: Message[], type: UpdateMessageType) => (prevState: Message[]) => {
	const mappedUpdated = updateData.map(el => el.id);
	if (type === UpdateMessageType.DELETE) {
		return prevState.filter(el => !mappedUpdated.includes(el.id));
	}
	if (!updateData.length) return prevState;
	return prevState.map(el => {
		const [updated] = updateData;
		if (el.id === updated.id) return updated;
		return el;
	});
};
