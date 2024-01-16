import { useCallback, useEffect, useRef, useState } from 'react';
import { useLatest } from '@/app/chat/[chatId]/hooks/useLatest';

export const useSelect = <T extends Record<'id', string>>(list: T[] = []) => {
	const listRef = useLatest(list);
	const [selectedIds, setSelectedIds] = useState<string[]>([]);
	const [isAllSelected, setIsAllSelected] = useState<boolean>(selectedIds.length < list.length);
	const startSelectionRef = useRef<string>('');

	useEffect(() => setIsAllSelected(selectedIds.length === list.length), [selectedIds.length, list.length]);

	const toggleAllSelected = useCallback(
		() =>
			setSelectedIds(prevState =>
				prevState.length === listRef.current.length
					? [startSelectionRef.current]
					: listRef.current.map(el => el.id)
			),
		[listRef]
	);

	const addSelection = useCallback(
		(id: string) =>
			setSelectedIds(prevState => {
				if (prevState.includes(id)) return prevState.filter(el => el !== id);
				return [...prevState, id];
			}),
		[]
	);

	const startSelection = useCallback(
		(id: string) => () => {
			setSelectedIds(prevState => (prevState.length ? [] : [id]));
			startSelectionRef.current = startSelectionRef.current ? '' : id;
		},
		[]
	);

	const dropSelectMode = useCallback(() => {
		setSelectedIds([]);
		startSelectionRef.current = '';
	}, []);

	return { selectedIds, isAllSelected, toggleAllSelected, addSelection, startSelection, dropSelectMode };
};
