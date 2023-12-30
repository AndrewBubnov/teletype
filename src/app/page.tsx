import { auth } from '@clerk/nextjs';
import { HeroContainer, LogLinkWrapper, StyledTypography } from '@/app/styled';
import { Button } from '@mui/joy';
import Link from 'next/link';

export default function Home() {
	const userId = auth().userId as string;

	if (userId) return null;

	return (
		<HeroContainer>
			<StyledTypography>Please register or sign in to continue</StyledTypography>
			<LogLinkWrapper>
				<Link href="/sign-in">
					<Button>Sign in</Button>
				</Link>
				<Link href="/sign-up">
					<Button>Sign up</Button>
				</Link>
			</LogLinkWrapper>
		</HeroContainer>
	);
}
