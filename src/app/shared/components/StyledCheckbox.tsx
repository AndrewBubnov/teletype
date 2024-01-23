import styles from '@/app/shared/shared.module.css';

interface StyledCheckboxProps {
	id: string;
	checked: boolean;
	onChange?(): void;
	label?: string;
}

export const StyledCheckbox = ({ id, checked, label, onChange }: StyledCheckboxProps) => (
	<div className={styles.labelWrapper}>
		<input
			type="checkbox"
			className={styles.checkbox}
			id={id}
			checked={checked}
			onChange={onChange}
			readOnly={!onChange}
		/>
		<label htmlFor={id} className={styles.checkboxLabel}>
			{label ? <span className={styles.labelSpan}>{label}</span> : null}
		</label>
	</div>
);
