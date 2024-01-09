import { getUser } from '@/actions/getUser';
import { getUserChats } from '@/actions/getUserChats';
import { getAllUserEmails } from '@/actions/getAllUserEmails';
import { Subscriber } from '@/app/components/Subscriber';
import { fetchChatMessages } from '@/actions/fetchChatMessages';
import { deleteReadMessages } from '@/actions/deleteReadMessages';

export const Fetcher = async () => {
	const user = await getUser();
	const userChats = await getUserChats(user.chatIds);
	const userEmails = await getAllUserEmails();
	const messageMap = await fetchChatMessages(userChats);
	await deleteReadMessages(userChats);

	return <Subscriber userChats={userChats} userEmails={userEmails} userId={user.userId} messageMap={messageMap} />;
};
