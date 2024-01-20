import { auth } from '@clerk/nextjs';
import Link from 'next/link';
import styles from './home.module.css';

export default function Home() {
	const userId = auth().userId as string;

	if (userId) return null;

	return (
		<>
			<div className={styles.container}>
				<p className={styles.teletype}>Teletype</p>
				<div className={styles.signLinkWrapper}>
					<Link href="/sign-in" className={styles.button}>
						Sign in
					</Link>
					<Link href="/sign-up" className={styles.button}>
						Sign up
					</Link>
				</div>
			</div>
			<p className={styles.author}>witvit&nbsp;&#174;</p>
		</>
	);
}
