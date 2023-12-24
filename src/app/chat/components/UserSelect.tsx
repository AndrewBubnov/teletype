'use client';
import { SyntheticEvent, useState } from 'react';
import { useStore } from '@/store';
import { useUser } from '@clerk/nextjs';
import { StyledInput } from '@/app/chat/styled';
import { Autocomplete } from '@mui/material';
import { getUserIdByEmail } from '@/actions/getUserIdByEmail';
import { onCreateChat } from '@/app/chat/utils/onCreateChat';
import { createRoom } from '@/utils/createRoom';

export const UserSelect = () => {
	const { user } = useUser();
	const userId = user?.id as string;

	const { userEmails } = useStore();

	const [userEmail, setUserEmail] = useState<string | null>(null);

	const changeHandler = async (evt: SyntheticEvent<Element, Event>, value: string | null) => {
		setUserEmail(value);
		const id = await getUserIdByEmail(value);
		setUserEmail(null);
		if (!userId || !id) return;
		await onCreateChat(userId, id);
		createRoom(userId, id);
	};

	return (
		<Autocomplete
			clearOnEscape
			blurOnSelect
			value={userEmail}
			onChange={changeHandler}
			options={userEmails}
			isOptionEqualToValue={(option: string, value: string) => option === value || !value}
			renderInput={params => <StyledInput {...params} sx={{ width: '80%' }} label="Search" />}
		/>
	);
};
