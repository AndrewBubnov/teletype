import { LoaderWrapper, LoadingIndicator } from '@/app/shared/styled';
import styles from './shared.module.css';

export const FullScreenLoader = () => (
	<div className={styles.loaderWrapper}>
		<div className={styles.loader} />
	</div>
);
