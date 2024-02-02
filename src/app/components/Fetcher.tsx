import { getUser } from '@/prismaActions/getUser';
import { getUserChats } from '@/prismaActions/getUserChats';
import { getAllUserEmails } from '@/prismaActions/getAllUserEmails';
import { Subscriber } from '@/app/components/Subscriber';
import { fetchChatsMessages } from '@/prismaActions/fetchChatsMessages';
import { deleteReadMessages } from '@/prismaActions/deleteReadMessages';
import { createMessagesSlice } from '@/prismaActions/createMessagesSlice';

export const Fetcher = async () => {
	const user = await getUser();
	const userChats = await getUserChats(user.chatIds);
	const userEmails = await getAllUserEmails();
	const messageMap = await fetchChatsMessages(userChats);
	const messagesSlice = await createMessagesSlice(userChats);
	await deleteReadMessages(userChats);

	return (
		<Subscriber
			userChats={userChats}
			userEmails={userEmails}
			userId={user.userId}
			messageMap={messageMap}
			messagesSlice={messagesSlice}
		/>
	);
};
