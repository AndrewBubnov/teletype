'use client';

import { useEffect } from 'react';
import { HeroContainer } from '@/app/styled';
import { Button } from '@mui/joy';

export default function Error({ reset, error }: { reset(): void; error: Error & { digest?: string } }) {
	useEffect(() => console.error(error), [error]);
	return (
		<div>
			<HeroContainer>
				Sorry, something went wrong
				<Button onClick={reset}>Please try again</Button>
			</HeroContainer>
		</div>
	);
}
