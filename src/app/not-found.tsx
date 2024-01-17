import Link from 'next/link';
import { Button } from '@mui/joy';
import { HeroContainer } from '@/app/styled';
import { CHAT_LIST } from '@/constants';

export default function NotFound() {
	return (
		<HeroContainer>
			<h2>Page not found</h2>
			<Link href={CHAT_LIST}>
				<Button>Back Home</Button>
			</Link>
		</HeroContainer>
	);
}
