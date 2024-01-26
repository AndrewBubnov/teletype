import styles from '../chatId.module.css';
import Link from 'next/link';

export const LinkMessagePart = ({ href }: { href: string }) => (
	<>
		<br />
		<Link href={href} className={styles.styledLink} target="_blank" rel="noopener noreferrer">
			{href}
		</Link>
		<br />
	</>
);
