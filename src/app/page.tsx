import { auth } from '@clerk/nextjs';
import { Author, HeroContainer, LogLinkWrapper, StyledTypography } from '@/app/styled';
import { Button } from '@mui/joy';
import Link from 'next/link';

export default function Home() {
	const userId = auth().userId as string;

	if (userId) return null;

	return (
		<>
			<HeroContainer>
				<StyledTypography>Teletype</StyledTypography>
				<LogLinkWrapper>
					<Link href="/sign-in">
						<Button size="lg">Sign in</Button>
					</Link>
					<Link href="/sign-up">
						<Button size="lg">Sign up</Button>
					</Link>
				</LogLinkWrapper>
			</HeroContainer>
			<Author>witvit&nbsp;&#174;</Author>
		</>
	);
}
