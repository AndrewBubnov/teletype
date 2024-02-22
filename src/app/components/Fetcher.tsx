import { getUser } from '@/prismaActions/getUser';
import { getUserChats } from '@/prismaActions/getUserChats';
import { getAllUserEmails } from '@/prismaActions/getAllUserEmails';
import { Subscriber } from '@/app/components/Subscriber';
import { fetchChatMessages } from '@/prismaActions/fetchChatMessages';
import { deleteReadMessages } from '@/prismaActions/deleteReadMessages';

export const Fetcher = async () => {
	const user = await getUser();
	const userChats = await getUserChats(user.chatIds);
	const userEmails = await getAllUserEmails();
	const messageMap = await fetchChatMessages(userChats);
	await deleteReadMessages(userChats);

	return <Subscriber userChats={userChats} userEmails={userEmails} userId={user.userId} messageMap={messageMap} />;
};
