'use client';

import { useEffect } from 'react';
import styles from './home.module.css';

export default function Error({ reset, error }: { reset(): void; error: Error & { digest?: string } }) {
	useEffect(() => console.error(error), [error]);
	return (
		<div>
			<div className={styles.container}>
				Sorry, something went wrong
				<button className={styles.button} onClick={reset}>
					Please try again
				</button>
			</div>
		</div>
	);
}
