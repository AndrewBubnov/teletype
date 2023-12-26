import { auth } from '@clerk/nextjs';
import { HeroContainer, LogLink, LogLinkWrapper, StyledTypography } from '@/app/styled';
import { Typography } from '@mui/material';

export default function Home() {
	const userId = auth().userId as string;

	if (userId) return null;

	return (
		<HeroContainer>
			<StyledTypography>Please register or sign in to continue</StyledTypography>
			<LogLinkWrapper>
				<LogLink href="/sign-in">Sign in</LogLink>
				<LogLink href="/sign-up">Sign up</LogLink>
			</LogLinkWrapper>
		</HeroContainer>
	);
}
