import styles from '@/app/shared/shared.module.css';
import { StyledCheckboxProps } from '@/types';

export const StyledCheckbox = ({ id, checked, label, onChange }: StyledCheckboxProps) => (
	<label className={styles.checkboxWrapper} htmlFor={id}>
		<input
			type="checkbox"
			className={styles.checkbox}
			id={id}
			checked={checked}
			onChange={onChange}
			readOnly={!onChange}
		/>
		{label && <span>{label}</span>}
	</label>
);
