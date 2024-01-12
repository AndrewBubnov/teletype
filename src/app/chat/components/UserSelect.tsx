'use client';
import { SyntheticEvent, useState } from 'react';
import { useStore } from '@/store';
import { StyledInput } from '@/app/chat/styled';
import { Autocomplete } from '@mui/material';
import { getUserIdByEmail } from '@/actions/getUserIdByEmail';
import { onCreateChat } from '@/app/chat/utils/onCreateChat';
import { createRoom } from '@/utils/createRoom';

export const UserSelect = ({ canOpen }: { canOpen: boolean }) => {
	const { userEmails, userId } = useStore(state => ({
		userEmails: state.userEmails,
		userId: state.userId,
	}));

	const [userEmail, setUserEmail] = useState<string | null>(null);
	const [open, setOpen] = useState<boolean>(false);

	const changeHandler = async (_: SyntheticEvent<Element, Event>, value: string | null) => {
		setUserEmail(value);
		const id = await getUserIdByEmail(value);
		setUserEmail(null);
		if (!userId || !id) return;
		await onCreateChat(userId, id);
		createRoom(userId, id);
	};

	const openHandler = () => {
		if (canOpen) setOpen(true);
	};

	const closeHandler = () => setOpen(false);

	return (
		<Autocomplete
			open={open}
			onOpen={openHandler}
			onClose={closeHandler}
			clearOnEscape
			blurOnSelect
			value={userEmail}
			onChange={changeHandler}
			options={userEmails}
			renderInput={params => <StyledInput {...params} label="Search" />}
		/>
	);
};
