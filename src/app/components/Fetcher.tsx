import { getUser } from '@/prismaActions/getUser';
import { getUserChats } from '@/prismaActions/getUserChats';
import { getAllUserEmails } from '@/prismaActions/getAllUserEmails';
import { Subscriber } from '@/app/components/Subscriber';
import { deleteReadMessages } from '@/prismaActions/deleteReadMessages';
import { createMessagesSlice } from '@/prismaActions/createMessagesSlice';

export const Fetcher = async () => {
	const [user, userEmails] = await Promise.all([getUser(), getAllUserEmails()]);
	const userChats = await getUserChats(user.chatIds);
	const messagesSlice = await createMessagesSlice(userChats);
	await deleteReadMessages(userChats);

	return (
		<Subscriber userChats={userChats} userEmails={userEmails} userId={user.userId} messagesSlice={messagesSlice} />
	);
};
