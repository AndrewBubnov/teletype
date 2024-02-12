import Link from 'next/link';
import Image from 'next/image';
import { IoIosArrowRoundBack as BackIcon } from 'react-icons/io';
import styles from '@/app/chat-list/[chatId]/chatId.module.css';
import { CHAT_LIST } from '@/constants';
import { BackButtonProps } from '@/types';
import { useIsWideModeStore } from '@/store';

export const BackButton = ({ interlocutorName, interlocutorImageUrl }: BackButtonProps) => {
	const isWideMode = useIsWideModeStore(state => state.isWideMode);

	if (isWideMode) return null;

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