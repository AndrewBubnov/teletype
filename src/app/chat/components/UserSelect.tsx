'use client';
import { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useCommonStore } from '@/store';
import { getUserIdByEmail } from '@/prismaActions/getUserIdByEmail';
import { onCreateChat } from '@/app/chat/utils/onCreateChat';
import { createRoom } from '@/webSocketActions/createRoom';
import styles from '../chat.module.css';

export const UserSelect = () => {
	const { userEmails, userId } = useCommonStore(state => ({
		userEmails: state.userEmails,
		userId: state.userId,
	}));

	const [userEmail, setUserEmail] = useState<string>('');
	const [isFocused, setIsFocused] = useState<boolean>(false);

	const inputRef = useRef<HTMLInputElement>(null);
	const ulRef = useRef<HTMLUListElement>(null);

	useEffect(() => {
		const handler = (evt: PointerEvent) => {
			const target = evt.target as Node;
			if (inputRef.current?.contains(target)) setIsFocused(true);
			if (!ulRef.current?.contains(target) && !inputRef.current?.contains(target)) setIsFocused(false);
		};
		document.addEventListener('pointerdown', handler);
		return () => document.removeEventListener('pointerdown', handler);
	}, []);

	const changeHandler = useCallback((evt: ChangeEvent<HTMLInputElement>) => setUserEmail(evt.target.value), []);

	const pickHandler = useCallback(
		async (email: string) => {
			setUserEmail('');
			const id = await getUserIdByEmail(email);
			if (!userId || !id) return;
			await onCreateChat(userId, id);
			createRoom(userId, id);
		},
		[userId]
	);

	const suggestions = useMemo(() => {
		const filtered = userEmails.filter(el => el.toLowerCase().includes(userEmail.toLowerCase()));
		if (!filtered.length) return <li key="no_options">No options</li>;
		return filtered.map(el => (
			<li key={el} onClick={() => pickHandler(el)}>
				{el}
			</li>
		));
	}, [pickHandler, userEmail, userEmails]);

	return (
		<div>
			<input
				ref={inputRef}
				value={userEmail}
				onChange={changeHandler}
				className={styles.search}
				placeholder="Search.."
			/>
			{isFocused ? (
				<ul className={styles.suggestions} ref={ulRef}>
					{suggestions}
				</ul>
			) : null}
		</div>
	);
};
