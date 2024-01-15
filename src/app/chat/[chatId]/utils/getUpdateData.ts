import { Message, UpdateData } from '@/types';

export interface GetUpdateData {
	isSelectMode: boolean;
	selectedIds: string[];
	informAll: boolean;
	updated: Message[];
	menuActiveId: string;
}

export const getUpdateData = ({
	isSelectMode,
	selectedIds,
	informAll,
	updated,
	menuActiveId,
}: GetUpdateData): UpdateData =>
	isSelectMode
		? selectedIds.reduce(
				(acc, cur, index) => ({
					...acc,
					[cur]: informAll ? null : updated[index],
				}),
				{} as UpdateData
			)
		: { [menuActiveId]: informAll ? null : updated[0] };
