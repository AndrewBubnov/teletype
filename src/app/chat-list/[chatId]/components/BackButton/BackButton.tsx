import { useIsWideModeStore } from '@/store';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { IoIosArrowRoundBack as BackIcon } from 'react-icons/io';
import { CHAT_LIST } from '@/constants';
import { BackButtonProps } from '@/types';
import styles from './BackButton.module.css';

export const BackButton = ({ interlocutorName, interlocutorImageUrl }: BackButtonProps) => {
	const isWideMode = useIsWideModeStore(state => state.isWideMode);
	const pathname = usePathname();

	if (isWideMode && pathname === CHAT_LIST) return null;

	return (
		<Link href={CHAT_LIST} className={styles.chatHeaderLink}>
			<div className={styles.centerHorizontalWrapper}>
				<BackIcon className={styles.backIcon} />
				{interlocutorImageUrl && (
					<Image
						className={styles.userPhotoImage}
						src={interlocutorImageUrl}
						alt={'photo'}
						height={30}
						width={30}
					/>
				)}
				<p>{interlocutorName}</p>
			</div>
		</Link>
	);
};
