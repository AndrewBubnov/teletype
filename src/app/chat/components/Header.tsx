import { auth, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { HeaderContainer, ProfileIcon, UserButtonWrapper } from '@/app/chat/styled';

export const Header = () => {
	const { userId } = auth();
	return (
		<HeaderContainer>
			{userId ? (
				<UserButtonWrapper>
					<UserButton afterSignOutUrl="/" />
				</UserButtonWrapper>
			) : null}
			<Link href={'/profile'}>
				<ProfileIcon />
			</Link>
		</HeaderContainer>
	);
};
