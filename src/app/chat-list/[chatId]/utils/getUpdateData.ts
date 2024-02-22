import { GetUpdateData, Message, UpdateData } from '@/types';

export const getUpdateData = ({ selectedIds, informAll, updated }: GetUpdateData): UpdateData =>
	selectedIds.reduce(
		(acc, cur, index) => ({
			...acc,
			[cur]: informAll ? null : updated[index],
		}),
		{} as UpdateData
	);
