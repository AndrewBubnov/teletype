'use client';
import { SyntheticEvent, useContext, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { StyledInput } from '@/app/chat/styled';
import { Autocomplete } from '@mui/material';
import { MainContext } from '@/app/chat/providers/MainProvider';
import { getUserIdByEmail } from '@/actions/getUserIdByEmail';
import { onCreateChat } from '@/app/chat/utils/onCreateChat';

export const UserSelect = () => {
	const { user } = useUser();
	const userId = user?.id as string;

	const { userEmails } = useContext(MainContext);
	const [userEmail, setUserEmail] = useState<string | null>(null);
	const changeHandler = async (evt: SyntheticEvent<Element, Event>, value: string | null) => {
		setUserEmail(value);
		const id = await getUserIdByEmail(value);
		setUserEmail(null);
		if (!userId || !id) return;
		await onCreateChat(userId, id);
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
