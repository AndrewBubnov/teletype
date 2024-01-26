import styles from '@/app/shared/shared.module.css';
import { clsx } from 'clsx';
import { StyledCheckboxProps } from '@/types';

export const StyledCheckbox = ({ id, checked, label, onChange, className = '' }: StyledCheckboxProps) => (
	<label className={styles.checkboxWrapper} htmlFor={id}>
		<input
			type="checkbox"
			className={clsx(styles.checkbox, className)}
			id={id}
			checked={checked}
			onChange={onChange}
			readOnly={!onChange}
		/>
		{label && <span>{label}</span>}
	</label>
);
