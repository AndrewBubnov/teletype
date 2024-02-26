import { getUser } from '@/prismaActions/getUser';
import { getUserChats } from '@/prismaActions/getUserChats';
import { getAllUserEmails } from '@/prismaActions/getAllUserEmails';
import { Subscriber } from '@/app/components/Subscriber';
import { createLastMessageMap } from '@/prismaActions/createLastMessageMap';
import { deleteReadMessages } from '@/prismaActions/deleteReadMessages';

export const Fetcher = async () => {
	const [user, userEmails] = await Promise.all([await getUser(), getAllUserEmails()]);
	const userChats = await getUserChats(user.chatIds);
	const messageMap = await createLastMessageMap(userChats);
	await deleteReadMessages(userChats);

	return <Subscriber userChats={userChats} userEmails={userEmails} userId={user.userId} messageMap={messageMap} />;
};
