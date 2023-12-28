import { getUser } from '@/actions/getUser';
import { getUserChats } from '@/actions/getUserChats';
import { getAllUserEmails } from '@/actions/getAllUserEmails';
import { Subscriber } from '@/app/chat/[chatId]/components/Subscriber';

export const Fetcher = async () => {
	const user = await getUser();
	const userChats = await getUserChats(user.chatIds);
	const userEmails = await getAllUserEmails();

	return <Subscriber userChats={userChats} userEmails={userEmails} userId={user.userId} />;
};
