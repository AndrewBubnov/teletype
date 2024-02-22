import Link from 'next/link';
import styles from './LinkMessagePart.module.css';

export const LinkMessagePart = ({ href }: { href: string }) => (
	<>
		<br />
		<Link href={href} className={styles.styledLink} target="_blank" rel="noopener noreferrer">
			{href}
		</Link>
		<br />
	</>
);
