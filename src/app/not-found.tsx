import Link from 'next/link';
import { CHAT_LIST } from '@/constants';
import styles from './home.module.css';

export default function NotFound() {
	return (
		<div className={styles.container}>
			<h2>Page not found</h2>
			<Link href={CHAT_LIST}>
				<button className={styles.button}>Back home</button>
			</Link>
		</div>
	);
}
