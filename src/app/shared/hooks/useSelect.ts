import { useCallback, useMemo, useRef, useState } from 'react';

export const useSelect = <T extends Record<'id', string>>(list: T[] = []) => {
	const [selectedIds, setSelectedIds] = useState<string[]>([]);
	const isAllSelected = useMemo<boolean>(() => selectedIds.length === list.length, [list.length, selectedIds.length]);
	const startSelectionRef = useRef<string>('');

	const toggleAllSelected = useCallback(
		() =>
			setSelectedIds(prevState =>
				prevState.length === list.length ? [startSelectionRef.current] : list.map(el => el.id)
			),
		[list]
	);

	const addSelection = useCallback(
		(id: string) =>
			setSelectedIds(prevState => {
				if (prevState.includes(id)) return prevState.filter(el => el !== id);
				return [...prevState, id];
			}),
		[]
	);

	const startSelection = useCallback((id: string) => {
		setSelectedIds(prevState => (prevState.length ? [] : [id]));
		startSelectionRef.current = id;
	}, []);

	const dropSelectMode = useCallback(() => setSelectedIds([]), []);

	return { selectedIds, isAllSelected, toggleAllSelected, addSelection, startSelection, dropSelectMode };
};
