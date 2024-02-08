import { Prisma } from '@prisma/client';
import { useCommonStore } from '@/store';

export const withErrorNotification = async (fn: Function, ...args: unknown[]) => {
	try {
		const result = fn(...args);
		if (result instanceof Promise) {
			return await result;
		}
		return result;
	} catch (error) {
		const { setErrorToastText } = useCommonStore.getState();
		const message =
			error instanceof Prisma.PrismaClientKnownRequestError || error instanceof Error
				? error.message
				: 'Something went wrong';
		setErrorToastText(message);
	}
};
