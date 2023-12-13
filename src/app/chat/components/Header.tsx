import { auth, UserButton } from '@clerk/nextjs';
import { HeaderContainer, UserButtonWrapper } from '@/app/chat/styled';

export const Header = () => {
	const { userId } = auth();
	return (
		<HeaderContainer>
			{userId ? (
				<UserButtonWrapper>
					<UserButton afterSignOutUrl="/" />
				</UserButtonWrapper>
			) : null}
		</HeaderContainer>
	);
};
