import { auth } from '@clerk/nextjs';
import { HeroContainer, LogLink, LogLinkWrapper } from '@/app/styled';
import { Typography } from '@mui/material';

export default function Home() {
	const userId = auth().userId as string;

	if (userId) return null;

	return (
		<HeroContainer>
			<Typography sx={{ fontSize: '1.5rem' }}>Please register or sign in to continue</Typography>
			<LogLinkWrapper>
				<LogLink href="/sign-in">Sign in</LogLink>
				<LogLink href="/sign-up">Sign up</LogLink>
			</LogLinkWrapper>
		</HeroContainer>
	);
}
